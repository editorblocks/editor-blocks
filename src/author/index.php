<?php
/**
 * Register and render `editor-blocks/author-profile` block in PHP.
 *
 * @package editor-blocks
 */

/**
 * Registers the `editor-blocks/author-profile` block on server.
 */
function eb_register_block_author_profile() {
	// Check if the register function exists.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}
	register_block_type(
		'editor-blocks/author-profile',
		array(
			'attributes'      => array(
				'authorID' => array(
					'type'    => 'string',
					'default' => '0',
				),
			),
			'render_callback' => 'eb_author_profile_render',
		)
	);
}
add_action( 'init', 'eb_register_block_author_profile' );

/**
 * Front end render function for 'editor-blocks/author-profile'.
 *
 * @param int $attributes The selected user ID.
 */
function eb_author_profile_render( $attributes ) {
	$author_id = isset( $attributes['authorID'] ) ? absint( $attributes['authorID'] ) : '';
	$user      = get_userdata( $author_id );

	if ( ! $user ) {

		return;

	}
	$output  = '';
	$output .= '<div class="author-profile clear">';
	$output .= '<div class="author-profile__image">' . get_avatar( $author_id ) . '</div>';
	$output .= '<div class="author-profile__content">';
	$output .= '<h3 class="author-profile__name">' . $user->user_nicename . '</h3>';
	$output .= '<p class="author-profile__description">' . $user->description . '</p>';
	$output .= '</div>';
	$output .= '</div>';

	return $output;
}
