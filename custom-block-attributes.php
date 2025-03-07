<?php
/**
 * Plugin Name: Custom Block Attributes
 * Description: Adds a custom panel to the block inspector for adding data attributes
 * Version: 1.0.0
 * Author: Your Name
 * License: GPL v2 or later
 */

if (!defined('ABSPATH')) {
    exit;
}

// Register our assets
function cba_register_block_editor_assets() {
    $asset_file = include(plugin_dir_path(__FILE__) . 'build/index.asset.php');
    
    wp_register_script(
        'custom-block-attributes',
        plugins_url('build/index.js', __FILE__),
        array_merge($asset_file['dependencies'], ['wp-blocks', 'wp-dom-ready', 'wp-edit-post']),
        $asset_file['version']
    );

    wp_enqueue_script('custom-block-attributes');
}
add_action('enqueue_block_editor_assets', 'cba_register_block_editor_assets');

// Filter block output to add data attributes
function cba_filter_block_output($block_content, $block) {
    if (empty($block['attrs']['dataAttributes'])) {
        return $block_content;
    }

    // Use HTML_Tag_Processor to safely modify HTML
    $processor = new WP_HTML_Tag_Processor($block_content);
    
    // Find the first HTML element
    if ($processor->next_tag()) {
        // Add each data attribute
        foreach ($block['attrs']['dataAttributes'] as $attr) {
            if (!empty($attr['name']) && isset($attr['value'])) {
                $processor->set_attribute(
                    'data-' . sanitize_key($attr['name']), 
                    sanitize_text_field($attr['value'])
                );
            }
        }
    }

    return $processor->get_updated_html();
}
add_filter('render_block', 'cba_filter_block_output', 10, 2);

// Register block attributes
function cba_register_block_attributes() {
    register_meta('post', 'dataAttributes', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'array',
        'default' => [],
    ]);
}
add_action('init', 'cba_register_block_attributes'); 