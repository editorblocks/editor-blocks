<?php
/**
 * Editor Blocks Welcome Page.
 *
 * @package editor-blocks
 */

/**
 * Create the editor blocks welcome page.
 */
class Editor_Blocks_Welcome {

	/**
	 * Start up
	 */
	public function __construct() {
			add_action( 'admin_menu', array( $this, 'add_plugin_page' ) );
			add_action( 'admin_enqueue_scripts', array( $this, 'enqueue' ) );

	}

	/**
	 * Add options page
	 */
	public function add_plugin_page() {
			// This page will be under "Settings".
			add_menu_page(
				'Editor Blocks Help',
				'Editor Blocks',
				'manage_options',
				'editor-blocks',
				array( $this, 'create_admin_page' ),
				'dashicons-editor-table'
			);
	}

	/**
	 * Add options page
	 */
	public function enqueue() {
		wp_enqueue_style( 'editor-blocks-welcome', plugins_url( 'admin/style.css', dirname( __FILE__ ) ), false, '1.0.0' );
	}

	/**
	 * Options page callback
	 */
	public function create_admin_page() {

		$ebt_install_url = wp_nonce_url(
			add_query_arg(
				array(
					'action' => 'install-theme',
					'theme'  => 'editor-blocks',
				),
				admin_url( 'update.php' )
			),
			'install-theme_editor-blocks'
		);

		$ebt_activate_url = wp_nonce_url(
			add_query_arg(
				array(
					'action'     => 'activate',
					'stylesheet' => 'editor-blocks',
				),
				admin_url( 'themes.php' )
			),
			'switch-theme_editor-blocks'
		);

			?>
			<div class="eb-wrap">
				<div class="eb-sidebar">
					<div class="eb-sidebar__header">
						<h2>Quickstart</h2>
					</div>
					<div class="eb-sidebar__inner">
						<div class="eb-sidebar__plugin">
							<h3>Editor Blocks Theme</h3>
							<p>We've built a companion theme to display Editor Blocks in the most beautiful way.</p>
							<?php
							if ( function_exists( 'editor_blocks_setup' ) ) {
								echo '<strong>&#10004; Editor Blocks Theme is active.</strong>';
							} elseif ( array_key_exists( 'editor-blocks', wp_get_themes() ) && ! function_exists( 'editor_blocks_setup' ) ) {
								echo '<a class="eb-button" href="' . $ebt_activate_url . '">Activate Theme</a>';
							} else {
								echo '<a class="eb-button" href="' . $ebt_install_url . '">Install Theme</a>';
							}
							?>
						</div>
					</div>
				</div>
				<div class="eb-content">
					<div class="eb-content__header">
						<h1>Editor Blocks Plugin Help</h1>
					</div>
					<div class="eb-content__inner">
						<h3>Thank you!</h3>

						<p>Thank you for installing the Editor Blocks plugin. We've created this page to help you get up and running as quickly as possible.</p>

						<h3>What is Gutenberg?</h3>

						<p>Gutenberg is WordPress’ next evolution of the text editor. In Gutenberg, content is divided into ‘Blocks’. A block can be a paragraph, an image, a video or anything else you can imagine. Blocks can be arranged using the drag and drop interface.</p>

						<p>By default Gutenberg comes packaged with 20 essential blocks, these include headings, audio, video quotes, lists, tables, custom HTML and more.</p>

						<h3>What is Editor Blocks?</h3>

						<p>Editor Blocks is a collection of blocks that expands on the basics Gutenberg provides.</p>

						<h3>What is the Editor Blocks theme?</h3>

						<p>The Editor Blocks companion theme is optimised to display Editor Blocks in the best way possible. Many themes have a narrow page width that doesn’t work well with wide blocks such as the Pricing Table block.</p>

						<p>Both the Editor Blocks plugin and theme work well independently, but together they are even better.</p>

						<h3>How to use Editor Blocks</h3>

						<p>There are two ways to insert Gutenberg blocks:</p>

						<p>The first way is to click the + sign and then choose a block from the popup that appears. Editor Blocks has it’s own category in the popup so you can easily find them.</p>

						<?php $image_src = plugins_url( 'admin/images/', dirname( __FILE__ ) ); ?>

						<a target="_blank" href="<?php echo esc_url( $image_src . 'insert1.gif' ); ?>"><img src="<?php echo esc_url( $image_src . 'insert1.gif' ); ?>" /></a>

						<p>A quicker way to insert a block is to place your cursor on the page and then type a forward slash followed by the first letters of the block you want to use,  for example /pri would bring up the pricing table block. This method is a lot faster when you are crafting a page.</p>

						<a target="_blank" href="<?php echo esc_url( $image_src . 'insert2.gif' ); ?>"><img src="<?php echo esc_url( $image_src . 'insert2.gif' ); ?>" /></a>

						<p class="eb-tip">Quick Tip: The ‘Wrapper’ block allows you to place any other block inside it. That means you can easily add a background, padding and margins to any block. </p>
					</div>
				</div>
				<div class="eb-blocks">
					<div class="eb-block">
						<img class="eb-block__image" src="<?php echo esc_url( $image_src . 'code.png' ); ?>">
						<h4>Wrapper Block</h4>
						<p class="feature__text">Add backgrounds and padding to any block.</p>
						<p><a target="_blank" href="https://editorblockswp.com/gutenberg-wrapper-block/">Learn More</a></p>
					</div>
					<div class="eb-block eb-block-odd">
						<img class="eb-block__image" src="<?php echo esc_url( $image_src . 'wallet.png' ); ?>">
						<h4>Pricing Table Block</h4>
						<p class="feature__text">Beautiful 2, 3, 4 or 5 column pricing tables.</p>
						<p><a target="_blank" href="https://editorblockswp.com/gutenberg-pricing-table-block/">Learn More</a></p>
					</div>
					<div class="eb-block">
						<img class="eb-block__image" src="<?php echo esc_url( $image_src . 'user-add.png' ); ?>">
						<h4>Team Block</h4>
						<p class="feature__text">Proudly display your team members.</p>
						<p><a target="_blank" href="https://editorblockswp.com/gutenberg-team-members-block/">Learn More</a></p>
					</div>
					<div class="eb-block eb-block-last eb-block-odd">
						<img class="eb-block__image" src="<?php echo esc_url( $image_src . 'photo.png' ); ?>">
						<h4>Hero Block</h4>
						<p class="feature__text">Add a stunning hero header image to your page. </p>
						<p><a target="_blank" href="https://editorblockswp.com/gutenberg-hero-block/">Learn More</a></p>
					</div>
					<div class="eb-block">
						<img class="eb-block__image" src="<?php echo esc_url( $image_src . 'badge.png' ); ?>">
						<h4>Testimonial Block</h4>
						<p class="feature__text">Show of your client testimonials with this beautiful block.</p>
						<p><a target="_blank" href="https://editorblockswp.com/gutenberg-testimonial-block/">Learn More</a></p>
					</div>
					<div class="eb-block eb-block-odd">
						<img class="eb-block__image" src="<?php echo esc_url( $image_src . 'announcement.png' ); ?>">
						<h4>Callout Block</h4>
						<p class="feature__text">Draw your visitors attention using a inline callout.</p>
						<p><a target="_blank" href="https://editorblockswp.com/gutenberg-callout-block/">Learn More</a></p>
					</div>
					<div class="eb-block">
						<img class="eb-block__image" src="<?php echo esc_url( $image_src . 'store-front.png' ); ?>">
						<h4>Brands Block</h4>
						<p class="feature__text">Output a list of brand images, perfect for displaying your clients.</p>
						<p><a target="_blank" href="https://editorblockswp.com/gutenberg-brands-block/">Learn More</a></p>
					</div>
					<div class="eb-block eb-block-last eb-block-odd">
						<img class="eb-block__image" src="<?php echo esc_url( $image_src . 'list-bullet.png' ); ?>">
						<h4>Features Block</h4>
						<p class="feature__text">Display an organised list of features, just like this one!</p>
						<p><a target="_blank" href="https://editorblockswp.com/gutenberg-features-block/">Learn More</a></p>
					</div>
					<div class="eb-block eb-block-empty">
					</div>
					<div class="eb-block eb-block-odd">
						<img class="eb-block__image" src="<?php echo esc_url( $image_src . 'arrow-thin-right.png' ); ?>">
						<h4>Horizontal Feature</h4>
						<p class="feature__text">Highlight a key feature using this horizontal display.</p>
						<p><a target="_blank" href="https://editorblockswp.com/gutenberg-horizontal-feature-block/">Learn More</a></p>
					</div>
					<div class="eb-block">
						<img class="eb-block__image" src="<?php echo esc_url( $image_src . 'arrow-thin-down.png' ); ?>">
						<h4>Vertical Feature</h4>
						<p class="feature__text">Highlight a key feature using this vertical display.</p>
						<p><a target="_blank" href="https://editorblockswp.com/gutenberg-vertical-feature-block/">Learn More</a></p>
					</div>
					<div class="eb-block eb-block-last eb-block-odd eb-block-empty">

					</div>
				</div>
			</div>
			<?php
	}
}

if ( is_admin() ) {
	$my_settings_page = new Editor_Blocks_Welcome();
}
