<?php
/**
 * Plugin Name: Polymer Connection CMS
 * Description: Registers Polymer Connection post types, taxonomies, ACF fields, and WPGraphQL settings for a headless manufacturing content model.
 * Version: 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

function polymer_connection_register_taxonomies() {
    $taxonomies = [
        'material_type' => 'Material Types',
        'application' => 'Applications',
        'manufacturing_method' => 'Manufacturing Methods',
        'performance_requirement' => 'Performance Requirements',
    ];

    foreach ($taxonomies as $slug => $label) {
        register_taxonomy($slug, ['process', 'material', 'industry', 'resource'], [
            'label' => $label,
            'public' => true,
            'show_in_graphql' => true,
            'graphql_single_name' => ucfirst($slug),
            'graphql_plural_name' => str_replace(' ', '', $label),
            'hierarchical' => true,
            'show_ui' => true,
            'rewrite' => ['slug' => $slug],
        ]);
    }
}
add_action('init', 'polymer_connection_register_taxonomies');

function polymer_connection_register_post_types() {
    $post_types = [
        'process' => ['Processes', 'Process'],
        'material' => ['Materials', 'Material'],
        'industry' => ['Industries', 'Industry'],
        'service' => ['Services', 'Service'],
        'resource' => ['Resources', 'Resource'],
    ];

    foreach ($post_types as $slug => $labels) {
        register_post_type($slug, [
            'label' => $labels[0],
            'public' => true,
            'show_in_rest' => true,
            'menu_icon' => 'dashicons-database-view',
            'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
            'has_archive' => true,
            'rewrite' => ['slug' => $slug],
            'show_in_graphql' => true,
            'graphql_single_name' => $labels[1],
            'graphql_plural_name' => $labels[0],
        ]);
    }
}
add_action('init', 'polymer_connection_register_post_types');

function polymer_connection_register_acf_fields() {
    if (!function_exists('acf_add_local_field_group')) {
        return;
    }

    acf_add_local_field_group([
        'key' => 'group_polymer_connection_processes',
        'title' => 'Process Fields',
        'fields' => [
            ['key' => 'field_process_description', 'label' => 'Description', 'name' => 'description', 'type' => 'textarea'],
            ['key' => 'field_process_materials', 'label' => 'Materials', 'name' => 'materials', 'type' => 'relationship', 'post_type' => ['material'], 'return_format' => 'object'],
            ['key' => 'field_process_industries', 'label' => 'Industries', 'name' => 'industries', 'type' => 'relationship', 'post_type' => ['industry'], 'return_format' => 'object'],
            ['key' => 'field_process_services', 'label' => 'Services', 'name' => 'services', 'type' => 'relationship', 'post_type' => ['service'], 'return_format' => 'object'],
            ['key' => 'field_process_advantages', 'label' => 'Advantages', 'name' => 'advantages', 'type' => 'repeater', 'sub_fields' => [['key' => 'field_process_advantage_item', 'label' => 'Item', 'name' => 'item', 'type' => 'text']]],
            ['key' => 'field_process_limitations', 'label' => 'Limitations', 'name' => 'limitations', 'type' => 'repeater', 'sub_fields' => [['key' => 'field_process_limitation_item', 'label' => 'Item', 'name' => 'item', 'type' => 'text']]],
        ],
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'process']]],
        'show_in_graphql' => 1,
    ]);

    acf_add_local_field_group([
        'key' => 'group_polymer_connection_materials',
        'title' => 'Material Fields',
        'fields' => [
            ['key' => 'field_material_density', 'label' => 'Density', 'name' => 'density', 'type' => 'text'],
            ['key' => 'field_material_temperature', 'label' => 'Temperature Resistance', 'name' => 'temperature_resistance', 'type' => 'number'],
            ['key' => 'field_material_strength', 'label' => 'Strength', 'name' => 'strength', 'type' => 'number'],
            ['key' => 'field_material_cost', 'label' => 'Cost Range', 'name' => 'cost_range', 'type' => 'select', 'choices' => ['Low' => 'Low', 'Medium' => 'Medium', 'High' => 'High']],
            ['key' => 'field_material_processes', 'label' => 'Related Processes', 'name' => 'related_processes', 'type' => 'relationship', 'post_type' => ['process'], 'return_format' => 'object'],
        ],
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'material']]],
        'show_in_graphql' => 1,
    ]);

    acf_add_local_field_group([
        'key' => 'group_polymer_connection_industries',
        'title' => 'Industry Fields',
        'fields' => [
            ['key' => 'field_industry_use_cases', 'label' => 'Use Cases', 'name' => 'use_cases', 'type' => 'repeater', 'sub_fields' => [['key' => 'field_industry_use_case_item', 'label' => 'Use Case', 'name' => 'item', 'type' => 'text']]],
            ['key' => 'field_industry_related_processes', 'label' => 'Related Processes', 'name' => 'related_processes', 'type' => 'relationship', 'post_type' => ['process'], 'return_format' => 'object'],
            ['key' => 'field_industry_related_materials', 'label' => 'Related Materials', 'name' => 'related_materials', 'type' => 'relationship', 'post_type' => ['material'], 'return_format' => 'object'],
        ],
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'industry']]],
        'show_in_graphql' => 1,
    ]);

    acf_add_local_field_group([
        'key' => 'group_polymer_connection_services',
        'title' => 'Service Fields',
        'fields' => [
            ['key' => 'field_service_description', 'label' => 'Description', 'name' => 'description', 'type' => 'textarea'],
            ['key' => 'field_service_related_processes', 'label' => 'Related Processes', 'name' => 'related_processes', 'type' => 'relationship', 'post_type' => ['process'], 'return_format' => 'object'],
        ],
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'service']]],
        'show_in_graphql' => 1,
    ]);

    acf_add_local_field_group([
        'key' => 'group_polymer_connection_resources',
        'title' => 'Resource Fields',
        'fields' => [
            ['key' => 'field_resource_type', 'label' => 'Type', 'name' => 'type', 'type' => 'select', 'choices' => ['guide' => 'Guide', 'comparison' => 'Comparison', 'dfm' => 'DFM']],
            ['key' => 'field_resource_related_processes', 'label' => 'Related Processes', 'name' => 'related_processes', 'type' => 'relationship', 'post_type' => ['process'], 'return_format' => 'object'],
            ['key' => 'field_resource_related_materials', 'label' => 'Related Materials', 'name' => 'related_materials', 'type' => 'relationship', 'post_type' => ['material'], 'return_format' => 'object'],
        ],
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'resource']]],
        'show_in_graphql' => 1,
    ]);
}
add_action('acf/init', 'polymer_connection_register_acf_fields');

function polymer_connection_register_graphql_fields() {
    if (!function_exists('register_graphql_field')) {
        return;
    }

    $relationship_map = [
        'Process' => ['materials', 'industries', 'services'],
        'Material' => ['relatedProcesses'],
        'Industry' => ['relatedProcesses', 'relatedMaterials'],
        'Service' => ['relatedProcesses'],
        'Resource' => ['relatedProcesses', 'relatedMaterials'],
    ];

    foreach ($relationship_map as $type => $fields) {
        foreach ($fields as $field_name) {
            register_graphql_field($type, $field_name, [
                'type' => ['list_of' => 'ContentNode'],
                'resolve' => function ($post) use ($field_name) {
                    return get_field($field_name, $post->ID) ?: [];
                },
            ]);
        }
    }
}
add_action('graphql_register_types', 'polymer_connection_register_graphql_fields');
