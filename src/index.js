import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, SelectControl, RangeControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

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
        
        // Initialize dataAttributes if it doesn't exist
        const dataAttributes = attributes.dataAttributes || [];
        
        // Find existing SAL attributes
        const getSalAttribute = (name) => {
            const attr = dataAttributes.find(attr => attr.name === name);
            return attr ? attr.value : '';
        };
        
        // Check if SAL animation is enabled
        const hasSalAnimation = Boolean(getSalAttribute('sal'));
        
        // Set initial state based on whether animation exists
        const [showAnimationControls, setShowAnimationControls] = useState(hasSalAnimation);
        
        // Update state when attributes change
        useEffect(() => {
            setShowAnimationControls(Boolean(getSalAttribute('sal')));
        }, [attributes.dataAttributes]);

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

        // Remove all SAL attributes
        const removeSalAnimation = () => {
            const newAttributes = dataAttributes.filter(attr => 
                !attr.name.startsWith('sal')
            );
            setAttributes({ dataAttributes: newAttributes });
            setShowAnimationControls(false);
        };

        // Add SAL animation preset
        const addSalAnimation = () => {
            const newAttributes = [
                ...dataAttributes.filter(attr => !attr.name.startsWith('sal')),
                { name: 'sal', value: 'fade' },
                { name: 'sal-duration', value: '500' },
                { name: 'sal-delay', value: '0' },
                { name: 'sal-easing', value: 'ease-out' }
            ];
            
            setAttributes({ dataAttributes: newAttributes });
            setShowAnimationControls(true);
        };

        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody
                        title="Scroll Animation"
                        initialOpen={false}
                    >
                        {!showAnimationControls ? (
                            <Button 
                                isPrimary 
                                onClick={addSalAnimation}
                                style={{ marginBottom: '10px', width: '100%' }}
                            >
                                Add Scroll Animation
                            </Button>
                        ) : (
                            <div style={{ 
                                padding: '15px', 
                                backgroundColor: '#f0f0f0', 
                                marginBottom: '15px',
                                borderRadius: '4px'
                            }}>
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

                                <Button 
                                    isDestructive
                                    onClick={removeSalAnimation}
                                    style={{ marginTop: '15px' }}
                                >
                                    Remove Animation
                                </Button>
                            </div>
                        )}
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