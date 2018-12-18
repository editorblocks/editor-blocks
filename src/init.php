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

/**
 * Enqueue Gutenberg block CSS for both frontend + backend.
 *
 * `wp-blocks`: includes block type registration and related functions.
 */
function editor_blocks_assets() {
	wp_enqueue_style(
		'editor-blocks',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		array(),
		EDITOR_BLOCKS_VERSION
	);
}

add_action( 'enqueue_block_assets', 'editor_blocks_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 */
function editor_blocks_backend_assets() {
	wp_enqueue_script(
		'editor-blocks-js',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor' ),
		EDITOR_BLOCKS_VERSION
	);

	// Styles.
	wp_enqueue_style(
		'editor-blocks-editor',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ),
		EDITOR_BLOCKS_VERSION
	);
}

add_action( 'enqueue_block_editor_assets', 'editor_blocks_backend_assets' );
