<?php
/**
 * Plugin Name: Editor Blocks for Gutenberg
 * Plugin URI: https://wordpress.org/plugins/editor-blocks
 * Description: A unique collection of Gutenberg blocks.
 * Author: editorblocks
 * Author URI: https://editorblockswp.com
 * Version: 1.2.0
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package editor-blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'EDITOR_BLOCKS_VERSION', '1.2.0' );

/**
 * Add a redirection check on activation.
 */
function editor_blocks_activate() {
	add_option( 'editor_blocks_do_activation_redirect', true );
}
register_activation_hook( __FILE__, 'editor_blocks_activate' );


/**
 * Redirect to the Editor Blocks Help page.
 */
function editor_blocks_redirect() {
	if ( get_option( 'editor_blocks_do_activation_redirect', false ) ) {
		delete_option( 'editor_blocks_do_activation_redirect' );
		if ( ! isset( $_GET['activate-multi'] ) ) {
			wp_redirect( 'admin.php?page=editor-blocks' );
		}
	}
}
add_action( 'admin_init', 'editor_blocks_redirect' );

// Add custom block category.
add_filter(
	'block_categories',
	function( $categories, $post ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'editor-blocks',
					'title' => __( 'Editor Blocks', 'editor-blocks' ),
				),
			)
		);
	},
	10,
	2
);

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
require_once plugin_dir_path( __FILE__ ) . 'src/author/index.php';
require_once plugin_dir_path( __FILE__ ) . 'admin/welcome.php';
require_once plugin_dir_path( __FILE__ ) . 'admin/class-editor-blocks-notice.php';
