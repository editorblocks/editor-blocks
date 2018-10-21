/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls, ColorPalette } = wp.editor;
const { PanelBody, PanelColor, TextControl, RangeControl } = wp.components;

/**
 * Inspector controls
 */
export default class Inspector extends Component {

	render() {

		const { attributes, setAttributes } = this.props;

		const { headingColor, headingSize, buttonText, buttonURL, buttonColor, buttonBackgroundColor } = attributes;

		return (
			<InspectorControls key="inspector">
				<PanelBody initialOpen={ true } title={ __( 'Callout Settings' ) }>
					<RangeControl
						label={ __( 'Font Size' ) }
						value={ headingSize }
						onChange={ ( headingSize ) => setAttributes( { headingSize } ) }
						min={ 2 }
						max={ 100 }
					/>
				</PanelBody>
				<PanelBody initialOpen={ true } title={ __( 'Button Settings' ) }>
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
				</PanelBody>
				<PanelColor title={ __( 'Text Color' ) } colorValue={ headingColor } initialOpen={ true }>
					<ColorPalette
						label={ __( 'Color' ) }
						value={ headingColor }
						onChange={ ( headingColor ) => setAttributes( { headingColor } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Button Text Color' ) } colorValue={ buttonColor } initialOpen={ false }>
					<ColorPalette
						label={ __( 'Text Color' ) }
						value={ buttonColor }
						onChange={ ( buttonColor ) => setAttributes( { buttonColor } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Button Background Color' ) } colorValue={ buttonBackgroundColor } initialOpen={ false }>
					<ColorPalette
						label={ __( 'Background Color' ) }
						value={ buttonBackgroundColor }
						onChange={ ( buttonBackgroundColor ) => setAttributes( { buttonBackgroundColor } ) }
					/>
				</PanelColor>
			</InspectorControls>
		);
	}
}
