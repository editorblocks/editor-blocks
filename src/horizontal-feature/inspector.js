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
				<PanelBody initialOpen={ true } title={ __( 'Layout Settings' ) }>
					<SelectControl
						label={ __( 'Image Position' ) }
						value={ attributes.imagePosition }
						onChange={ ( imagePosition ) => setAttributes( { imagePosition } ) }
						options={ [
							{ value: 'left', label: 'Left' },
							{ value: 'right', label: 'Right' },
						] }
					/>
				</PanelBody>
				<PanelBody initialOpen={ false } title={ __( 'Content Settings' ) }>
					<RangeControl
						label={ __( 'Content Width (%)' ) }
						value={ attributes.contentWidth }
						onChange={ ( contentWidth ) => setAttributes( { contentWidth } ) }
						min={ 0 }
						max={ 100 }
					/>
					<RangeControl
						label={ __( 'Content Padding Top (px)' ) }
						value={ attributes.contentPaddingTop }
						onChange={ ( contentPaddingTop ) => setAttributes( { contentPaddingTop } ) }
						min={ 0 }
						max={ 200 }
					/>
					<RangeControl
						label={ __( 'Content Padding Bottom (px)' ) }
						value={ attributes.contentPaddingBottom }
						onChange={ ( contentPaddingBottom ) => setAttributes( { contentPaddingBottom } ) }
						min={ 0 }
						max={ 200 }
					/>
				</PanelBody>
				<PanelBody initialOpen={ false } title={ __( 'Image Settings' ) }>
					<RangeControl
						label={ __( 'Image Width (%)' ) }
						value={ attributes.imageWidth }
						onChange={ ( imageWidth ) => setAttributes( { imageWidth } ) }
						min={ 0 }
						max={ 100 }
					/>
					<RangeControl
						label={ __( 'Image Padding Top (px)' ) }
						value={ attributes.imagePaddingTop }
						onChange={ ( imagePaddingTop ) => setAttributes( { imagePaddingTop } ) }
						min={ 0 }
						max={ 200 }
					/>
					<RangeControl
						label={ __( 'Image Padding Bottom (px)' ) }
						value={ attributes.imagePaddingBottom }
						onChange={ ( imagePaddingBottom ) => setAttributes( { imagePaddingBottom } ) }
						min={ 0 }
						max={ 200 }
					/>
				</PanelBody>
				<PanelBody initialOpen={ false } title={ __( 'Button Settings' ) }>
					<ToggleControl
						label={ __( 'Show Button' ) }
						checked={ !! attributes.showButton }
						help={ ( checked ) => checked ? __( 'Button is visible.' ) : __( 'Button is not visible.' ) }
						onChange={ ( showButton ) => setAttributes( { showButton } ) }
					/>
					{ attributes.showButton &&
						<Fragment>
							<TextControl
								label={ __( 'Button Text' ) }
								value={ attributes.buttonText }
								onChange={ ( buttonText ) => setAttributes( { buttonText } ) }
							/>
							<TextControl
								label={ __( 'Button URL' ) }
								value={ attributes.buttonURL }
								onChange={ ( buttonURL ) => setAttributes( { buttonURL } ) }
							/>
						</Fragment>
					}
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Color Settings' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: attributes.headingColor,
							onChange: ( headingColor ) => setAttributes( { headingColor } ),
							label: __( 'Heading Color' ),
						},
						{
							value: attributes.subHeadingColor,
							onChange: ( subHeadingColor ) => setAttributes( { subHeadingColor } ),
							label: __( 'Sub Heading Color' ),
						},
						{
							value: attributes.textColor,
							onChange: ( textColor ) => setAttributes( { textColor } ),
							label: __( 'Text Color' ),
						},
						{
							value: attributes.buttonColor,
							onChange: ( buttonColor ) => setAttributes( { buttonColor } ),
							label: __( 'Button Color' ),
						},
						{
							value: attributes.buttonBackgroundColor,
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
