/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { InspectorControls, PanelColorSettings } = wp.editor;
const { PanelBody, TextControl, SelectControl, RangeControl, ToggleControl } = wp.components;

/**
 * Inspector controls
 */
export default class Inspector extends Component {

	render() {
		const { attributes, setAttributes } = this.props;

		return (
			<InspectorControls key="inspector">
				<PanelBody initialOpen={ true } title={ __( 'Layout Settings', 'editor-blocks' ) }>
					<SelectControl
						label={ __( 'Image Position', 'editor-blocks' ) }
						value={ attributes.imagePosition }
						onChange={ ( imagePosition ) => setAttributes( { imagePosition } ) }
						options={ [
							{ value: 'left', label: __( 'Left', 'editor-blocks' ) },
							{ value: 'right', label: __( 'Right', 'editor-blocks' ) },
						] }
					/>
				</PanelBody>
				<PanelBody initialOpen={ false } title={ __( 'Content Settings', 'editor-blocks' ) }>
					<RangeControl
						label={ __( 'Content Width (%)', 'editor-blocks' ) }
						value={ attributes.contentWidth }
						onChange={ ( contentWidth ) => setAttributes( { contentWidth } ) }
						min={ 0 }
						max={ 100 }
					/>
					<RangeControl
						label={ __( 'Content Padding Top (px)', 'editor-blocks' ) }
						value={ attributes.contentPaddingTop }
						onChange={ ( contentPaddingTop ) => setAttributes( { contentPaddingTop } ) }
						min={ 0 }
						max={ 200 }
					/>
					<RangeControl
						label={ __( 'Content Padding Bottom (px)', 'editor-blocks' ) }
						value={ attributes.contentPaddingBottom }
						onChange={ ( contentPaddingBottom ) => setAttributes( { contentPaddingBottom } ) }
						min={ 0 }
						max={ 200 }
					/>
				</PanelBody>
				<PanelBody initialOpen={ false } title={ __( 'Image Settings', 'editor-blocks' ) }>
					<RangeControl
						label={ __( 'Image Width (%)', 'editor-blocks' ) }
						value={ attributes.imageWidth }
						onChange={ ( imageWidth ) => setAttributes( { imageWidth } ) }
						min={ 0 }
						max={ 100 }
					/>
					<RangeControl
						label={ __( 'Image Padding Top (px)', 'editor-blocks' ) }
						value={ attributes.imagePaddingTop }
						onChange={ ( imagePaddingTop ) => setAttributes( { imagePaddingTop } ) }
						min={ 0 }
						max={ 200 }
					/>
					<RangeControl
						label={ __( 'Image Padding Bottom (px)', 'editor-blocks' ) }
						value={ attributes.imagePaddingBottom }
						onChange={ ( imagePaddingBottom ) => setAttributes( { imagePaddingBottom } ) }
						min={ 0 }
						max={ 200 }
					/>
				</PanelBody>
				<PanelBody initialOpen={ false } title={ __( 'Button Settings', 'editor-blocks' ) }>
					<ToggleControl
						label={ __( 'Show Button', 'editor-blocks' ) }
						checked={ !! attributes.showButton }
						help={ ( checked ) => checked ? __( 'Button is visible.', 'editor-blocks' ) : __( 'Button is not visible.', 'editor-blocks' ) }
						onChange={ ( showButton ) => setAttributes( { showButton } ) }
					/>
					{ attributes.showButton &&
						<Fragment>
							<TextControl
								label={ __( 'Button Text', 'editor-blocks' ) }
								value={ attributes.buttonText }
								onChange={ ( buttonText ) => setAttributes( { buttonText } ) }
							/>
							<TextControl
								label={ __( 'Button URL', 'editor-blocks' ) }
								value={ attributes.buttonURL }
								onChange={ ( buttonURL ) => setAttributes( { buttonURL } ) }
							/>
						</Fragment>
					}
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Color Settings', 'editor-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: attributes.headingColor,
							onChange: ( headingColor ) => setAttributes( { headingColor } ),
							label: __( 'Heading Color', 'editor-blocks' ),
						},
						{
							value: attributes.subHeadingColor,
							onChange: ( subHeadingColor ) => setAttributes( { subHeadingColor } ),
							label: __( 'Sub Heading Color', 'editor-blocks' ),
						},
						{
							value: attributes.textColor,
							onChange: ( textColor ) => setAttributes( { textColor } ),
							label: __( 'Text Color', 'editor-blocks' ),
						},
						{
							value: attributes.buttonColor,
							onChange: ( buttonColor ) => setAttributes( { buttonColor } ),
							label: __( 'Button Color', 'editor-blocks' ),
						},
						{
							value: attributes.buttonBackgroundColor,
							onChange: ( buttonBackgroundColor ) => setAttributes( { buttonBackgroundColor } ),
							label: __( 'Button Background Color', 'editor-blocks' ),
						},
					] }
				>
				</PanelColorSettings>
			</InspectorControls>
		);
	}

}
