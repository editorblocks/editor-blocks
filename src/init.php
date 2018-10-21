<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @package editor-blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'EB_BLOCKS_VERSION', '1.0.6' );

/**
 * Enqueue Gutenberg block CSS for both frontend + backend.
 *
 * `wp-blocks`: includes block type registration and related functions.
 *
 * @since 1.0.0
 */
function editor_blocks_assets() {
	wp_enqueue_style(
		'editor-blocks-style-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		array( 'wp-blocks' ),
		EB_BLOCKS_VERSION
	);
}

add_action( 'enqueue_block_assets', 'editor_blocks_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function editor_blocks_backend_assets() {
	wp_enqueue_script(
		'editor-blocks-block-js',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element' ),
		EB_BLOCKS_VERSION
	);

	// Styles.
	wp_enqueue_style(
		'my_block-cgb-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ),
		EB_BLOCKS_VERSION
	);
}

add_action( 'enqueue_block_editor_assets', 'editor_blocks_backend_assets' );
