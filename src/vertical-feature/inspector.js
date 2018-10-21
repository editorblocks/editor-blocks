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

		const { contentWidth, contentPaddingTop, contentPaddingBottom, imageWidth, featureLayout, headingColor, subHeadingColor, textColor, showButton, buttonBackgroundColor, buttonColor, buttonText, buttonURL, imagePosition, imagePaddingTop, imagePaddingBottom } = attributes;

		return (
			<InspectorControls key="inspector">
				<PanelBody initialOpen={ true } title={ __( 'Layout Settings' ) }>
					<SelectControl
						label={ __( 'Image Position' ) }
						value={ imagePosition }
						onChange={ ( imagePosition ) => setAttributes( { imagePosition } ) }
						options={ [
							{ value: 'above', label: 'Above Content' },
							{ value: 'below', label: 'Below Content' },
						] }
					/>
				</PanelBody>
				<PanelBody initialOpen={ false } title={ __( 'Content Settings' ) }>
					<RangeControl
						label={ __( 'Content Width (px)' ) }
						value={ contentWidth }
						onChange={ ( contentWidth ) => setAttributes( { contentWidth } ) }
						min={ 0 }
		        max={ 1000 }
					/>
					<RangeControl
						label={ __( 'Content Padding Top (px)' ) }
						value={ contentPaddingTop }
						onChange={ ( contentPaddingTop ) => setAttributes( { contentPaddingTop } ) }
						min={ 0 }
						max={ 200 }
					/>
					<RangeControl
						label={ __( 'Content Padding Bottom (px)' ) }
						value={ contentPaddingBottom }
						onChange={ ( contentPaddingBottom ) => setAttributes( { contentPaddingBottom } ) }
						min={ 0 }
						max={ 200 }
					/>
				</PanelBody>
				<PanelBody initialOpen={ false } title={ __( 'Image Settings' ) }>
					<RangeControl
						label={ __( 'Image Width (px)' ) }
						value={ imageWidth }
						onChange={ ( imageWidth ) => setAttributes( { imageWidth } ) }
						min={ 0 }
		        max={ 1000 }
					/>
					<RangeControl
						label={ __( 'Image Padding Top (px)' ) }
						value={ imagePaddingTop }
						onChange={ ( imagePaddingTop ) => setAttributes( { imagePaddingTop } ) }
						min={ 0 }
		        max={ 200 }
					/>
					<RangeControl
						label={ __( 'Image Padding Bottom (px)' ) }
						value={ imagePaddingBottom }
						onChange={ ( imagePaddingBottom ) => setAttributes( { imagePaddingBottom } ) }
						min={ 0 }
		        max={ 200 }
					/>
				</PanelBody>
				<PanelBody initialOpen={ true } title={ __( 'Button Settings' ) }>
					<ToggleControl
						label={ __( 'Show Button' ) }
						checked={ !! showButton }
						help={ ( checked ) => checked ? __( 'Button is visible.' ) : __( 'Button is not visible.' ) }
						onChange={ ( showButton ) => setAttributes( { showButton } ) }
					/>
					{ showButton && (
						<Fragment>
							<TextControl
								label={ __( 'Button Text' ) }
								value={ buttonText }
								onChange={ ( buttonText ) => setAttributes( { buttonText } ) }
							/>
							<TextControl
								label={ __( 'Button URL' ) }
								value={ buttonURL }
								onChange={ ( buttonURL ) => setAttributes( { buttonURL } ) }
							/>
						</Fragment>
					) }
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Color Settings' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: headingColor,
							onChange: ( headingColor ) => setAttributes( { headingColor } ),
							label: __( 'Heading Color' ),
						},
						{
							value: subHeadingColor,
							onChange: ( subHeadingColor ) => setAttributes( { subHeadingColor } ),
							label: __( 'Sub Heading Color' ),
						},
						{
							value: textColor,
							onChange: ( textColor ) => setAttributes( { textColor } ),
							label: __( 'Text Color' ),
						},
						{
							value: buttonColor,
							onChange: ( buttonColor ) => setAttributes( { buttonColor } ),
							label: __( 'Button Color' ),
						},
						{
							value: buttonBackgroundColor,
							onChange: ( buttonBackgroundColor ) => setAttributes( { buttonBackgroundColor } ),
							label: __( 'Button Background Color' ),
						},
					] }
				>
				</PanelColorSettings>
			</InspectorControls>
		);
	}
}
