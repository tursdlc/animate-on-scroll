import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl, SelectControl, RangeControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

// Register the dataAttributes for all blocks
addFilter(
    'blocks.registerBlockType',
    'custom-block-attributes/add-attributes',
    (settings) => {
        // Store the original save function
        const originalSave = settings.save;

        // Create a new save function that wraps the original
        settings.save = (props) => {
            // Get the original save element
            const element = originalSave(props);
            
            if (!element || !props.attributes.dataAttributes || props.attributes.dataAttributes.length === 0) {
                return element;
            }
            
            // Clone the element to avoid modifying the original
            const newElement = { ...element };
            
            // Make sure props exists
            if (!newElement.props) {
                newElement.props = {};
            }
            
            // Add data attributes to the props
            props.attributes.dataAttributes.forEach(attr => {
                if (attr.name && attr.value) {
                    newElement.props[`data-${attr.name}`] = attr.value;
                }
            });
            
            return newElement;
        };

        // Add the dataAttributes attribute to all blocks
        settings.attributes = {
            ...settings.attributes,
            dataAttributes: {
                type: 'array',
                default: [],
            },
        };

        // Add support for custom attributes
        settings.supports = {
            ...settings.supports,
            customClassName: true,
            html: true,
        };

        return settings;
    }
);

// Higher order component to add custom inspector controls
const withCustomAttributes = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const { attributes, setAttributes } = props;
        const [newAttrName, setNewAttrName] = useState('');
        const [newAttrValue, setNewAttrValue] = useState('');
        const [showSalOptions, setShowSalOptions] = useState(false);

        // Initialize dataAttributes if it doesn't exist
        const dataAttributes = attributes.dataAttributes || [];

        // SAL animation options
        const animationOptions = [
            { label: 'Fade', value: 'fade' },
            { label: 'Slide Up', value: 'slide-up' },
            { label: 'Slide Down', value: 'slide-down' },
            { label: 'Slide Left', value: 'slide-left' },
            { label: 'Slide Right', value: 'slide-right' },
            { label: 'Zoom In', value: 'zoom-in' },
            { label: 'Zoom Out', value: 'zoom-out' },
        ];

        const durationOptions = [
            { label: '200ms', value: '200' },
            { label: '300ms', value: '300' },
            { label: '400ms', value: '400' },
            { label: '500ms', value: '500' },
            { label: '600ms', value: '600' },
            { label: '700ms', value: '700' },
            { label: '800ms', value: '800' },
            { label: '900ms', value: '900' },
            { label: '1000ms', value: '1000' },
        ];

        const easingOptions = [
            { label: 'Linear', value: 'linear' },
            { label: 'Ease', value: 'ease' },
            { label: 'Ease In', value: 'ease-in' },
            { label: 'Ease Out', value: 'ease-out' },
            { label: 'Ease In Out', value: 'ease-in-out' },
        ];

        // Find existing SAL attributes
        const getSalAttribute = (name) => {
            const attr = dataAttributes.find(attr => attr.name === name);
            return attr ? attr.value : '';
        };

        // Add or update a SAL attribute
        const updateSalAttribute = (name, value) => {
            const newAttributes = [...dataAttributes];
            const existingIndex = newAttributes.findIndex(attr => attr.name === name);
            
            if (existingIndex !== -1) {
                if (value) {
                    newAttributes[existingIndex].value = value;
                } else {
                    // Remove if value is empty
                    newAttributes.splice(existingIndex, 1);
                }
            } else if (value) {
                newAttributes.push({ name, value });
            }
            
            setAttributes({ dataAttributes: newAttributes });
        };

        const addAttribute = () => {
            if (!newAttrName) return;

            const newAttributes = [
                ...dataAttributes,
                {
                    name: newAttrName,
                    value: newAttrValue
                }
            ];

            setAttributes({ dataAttributes: newAttributes });
            setNewAttrName('');
            setNewAttrValue('');
        };

        const removeAttribute = (index) => {
            const newAttributes = dataAttributes.filter((_, i) => i !== index);
            setAttributes({ dataAttributes: newAttributes });
        };

        // Add SAL animation preset
        const addSalAnimation = () => {
            updateSalAttribute('sal', 'fade');
            updateSalAttribute('sal-duration', '500');
            updateSalAttribute('sal-delay', '0');
            updateSalAttribute('sal-easing', 'ease-out');
        };

        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody
                        title="Custom Data Attributes"
                        initialOpen={false}
                    >
                        {/* SAL Animation Options */}
                        <Button 
                            isPrimary 
                            onClick={() => {
                                if (!getSalAttribute('sal')) {
                                    addSalAnimation();
                                }
                                setShowSalOptions(!showSalOptions);
                            }}
                            style={{ marginBottom: '10px' }}
                        >
                            {getSalAttribute('sal') ? 'Edit SAL Animation' : 'Add SAL Animation'}
                        </Button>

                        {(showSalOptions || getSalAttribute('sal')) && (
                            <div style={{ padding: '10px', backgroundColor: '#f0f0f0', marginBottom: '15px' }}>
                                <SelectControl
                                    label="Animation Type"
                                    value={getSalAttribute('sal')}
                                    options={animationOptions}
                                    onChange={(value) => updateSalAttribute('sal', value)}
                                />
                                
                                <SelectControl
                                    label="Duration"
                                    value={getSalAttribute('sal-duration')}
                                    options={durationOptions}
                                    onChange={(value) => updateSalAttribute('sal-duration', value)}
                                />
                                
                                <RangeControl
                                    label="Delay (ms)"
                                    value={parseInt(getSalAttribute('sal-delay') || '0')}
                                    onChange={(value) => updateSalAttribute('sal-delay', value.toString())}
                                    min={0}
                                    max={1000}
                                    step={100}
                                />
                                
                                <SelectControl
                                    label="Easing"
                                    value={getSalAttribute('sal-easing')}
                                    options={easingOptions}
                                    onChange={(value) => updateSalAttribute('sal-easing', value)}
                                />
                            </div>
                        )}

                        {/* Display existing attributes */}
                        <h3>Custom Attributes</h3>
                        {dataAttributes && dataAttributes.length > 0 ? (
                            dataAttributes.map((attr, index) => (
                                <div key={index} style={{ marginBottom: '10px' }}>
                                    <div>
                                        data-{attr.name}: {attr.value}
                                        <Button
                                            isDestructive
                                            onClick={() => removeAttribute(index)}
                                            style={{ marginLeft: '10px' }}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No custom attributes added yet.</p>
                        )}

                        {/* Add new attribute form */}
                        <h3>Add Custom Attribute</h3>
                        <TextControl
                            label="Attribute Name"
                            value={newAttrName}
                            onChange={setNewAttrName}
                            placeholder="Enter attribute name"
                        />
                        <TextControl
                            label="Attribute Value"
                            value={newAttrValue}
                            onChange={setNewAttrValue}
                            placeholder="Enter attribute value"
                        />
                        <Button
                            isPrimary
                            onClick={addAttribute}
                            disabled={!newAttrName}
                        >
                            Add Attribute
                        </Button>
                    </PanelBody>
                </InspectorControls>
            </>
        );
    };
}, 'withCustomAttributes');

// Add our custom attributes panel to all blocks
addFilter(
    'editor.BlockEdit',
    'custom-block-attributes/with-custom-attributes',
    withCustomAttributes
); 