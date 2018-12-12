<?php
/**
 * Notice Class.
 *
 * @package   editor-blocks
 * @copyright Copyright (c) 2018, Danny Cooper
 * @license   http://opensource.org/licenses/gpl-2.0.php GNU Public License
 */

if ( ! class_exists( 'Editor_Blocks_Notice' ) ) :
	/**
	 * The welcome.
	 */
	class Editor_Blocks_Notice {
		/**
		 * Slug.
		 *
		 * @var string $slug
		 */
		private $slug;
		/**
		 * Message.
		 *
		 * @var string $message
		 */
		private $message;
		/**
		 * Tyle.
		 *
		 * @var string $type
		 */
		private $type;
		/**
		 * Class constructor.
		 *
		 * @param string $slug Slug.
		 * @param string $message Message.
		 * @param string $type Type.
		 */
		public function __construct( $slug, $message, $type = 'success' ) {
			$this->slug    = $slug;
			$this->message = $message;
			$this->type    = $type;
			// Add actions.
			add_action( 'admin_notices', array( $this, 'display_admin_notice' ) );
			add_action( 'wp_ajax_editor_blocks_dismiss_notice', array( $this, 'dismiss_notice' ) );
			add_action( 'admin_enqueue_scripts', array( $this, 'enqueue' ) );
		}
		/**
		 * Enqeue the styles and scripts.
		 */
		public function enqueue() {
			wp_enqueue_script( 'editor-blocks-dismiss-notice', esc_url( plugin_dir_url( __FILE__ ) . 'js/dismiss.js' ), 'jquery', EDITOR_BLOCKS_VERSION, false );
		}
		/**
		 * AJAX handler to store the state of dismissible notices.
		 */
		public function dismiss_notice() {
			if ( isset( $_POST['type'] ) ) {
				// Pick up the notice "type" - passed via jQuery (the "data-notice" attribute on the notice).
				$type = sanitize_text_field( wp_unslash( $_POST['type'] ) );
				// Store it in the options table.
				update_option( 'dismissed-' . $type, true );
			}
		}
		/**
		 * Display the admin notice.
		 */
		public function display_admin_notice() {
			if ( get_option( 'dismissed-' . $this->slug, false ) ) {
				return;
			}
			if ( is_plugin_active( 'disable-gutenberg-blocks/class-disable-gutenberg-blocks.php' ) ) {
				return;
			}
			?>

			<div class="notice notice-<?php echo esc_attr( $this->type ); ?> is-dismissible notice-dismiss-dc"  data-notice="<?php echo esc_attr( $this->slug ); ?>">
				<p>
					<?php
						echo $this->message; // WPCS: XSS ok.
					?>
				</p>
			</div>
			<?php
		}
	}
endif;
$message = sprintf(
	// translators: %s Link to Google Fonts customizer panel.
	__( 'Thanks for using Editor Blocks! Our latest plugin allows you to control which blocks are shown in the editor - <a href="%s">Disable Gutenberg Blocks</a>.', 'editor-blocks' ),
	esc_url( admin_url( 'plugin-install.php?s=disable-gutenberg-blocks&tab=search&type=tag' ) )
);

/*
* Instantiate the Editor_Blocks_Notice class.
*/
new Editor_Blocks_Notice( 'disable-google-fonts', $message, 'success' );
