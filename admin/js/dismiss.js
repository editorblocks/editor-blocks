jQuery( document ).ready( function() {

	// Hook into the "notice-dismiss-welcome" class we added to the notice, so
	// Only listen to YOUR notices being dismissed
	jQuery( document ).on(
		'click',
		'.notice-dismiss-dc .notice-dismiss',
		function() {

			// Read the "data-notice" information to track which notice
			// is being dismissed and send it via AJAX
			const type = jQuery( this ).closest( '.notice-dismiss-dc' ).data( 'notice' );
			// Make an AJAX call
			// Since WP 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
			jQuery.ajax(
				ajaxurl,
				{
					type: 'POST',
					data: {
						action: 'editor_blocks_dismiss_notice',
						type: type,
					},
				}
			);

		}
	);

}
);
