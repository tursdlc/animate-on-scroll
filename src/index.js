import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl } from '@wordpress/components';
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

// We can remove this filter since we're handling it in the save function now
// addFilter(
//     'blocks.getSaveContent.extraProps',
//     'custom-block-attributes/save-props',
//     (extraProps, blockType, attributes) => {
//         if (attributes.dataAttributes && attributes.dataAttributes.length > 0) {
//             attributes.dataAttributes.forEach(attr => {
//                 if (attr.name && attr.value) {
//                     extraProps[`data-${attr.name}`] = attr.value;
//                 }
//             });
//         }
//         return extraProps;
//     }
// );

// Higher order component to add custom inspector controls
const withCustomAttributes = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const { attributes, setAttributes } = props;
        const [newAttrName, setNewAttrName] = useState('');
        const [newAttrValue, setNewAttrValue] = useState('');

        // Initialize dataAttributes if it doesn't exist
        const dataAttributes = attributes.dataAttributes || [];

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

        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody
                        title="Custom Data Attributes"
                        initialOpen={false}
                    >
                        {/* Display existing attributes */}
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