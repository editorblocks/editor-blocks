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

		return (
			<InspectorControls>
				<PanelBody initialOpen={ true } title={ __( 'Callout Settings' ) }>
					<RangeControl
						label={ __( 'Font Size' ) }
						value={ attributes.headingSize }
						onChange={ ( headingSize ) => setAttributes( { headingSize } ) }
						min={ 2 }
						max={ 100 }
					/>
				</PanelBody>
				<PanelBody initialOpen={ true } title={ __( 'Button Settings' ) }>
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
				</PanelBody>
				<PanelColor title={ __( 'Text Color' ) } colorValue={ attributes.headingColor } initialOpen={ true }>
					<ColorPalette
						label={ __( 'Color' ) }
						value={ attributes.headingColor }
						onChange={ ( headingColor ) => setAttributes( { headingColor } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Button Text Color' ) } colorValue={ attributes.buttonColor } initialOpen={ false }>
					<ColorPalette
						label={ __( 'Text Color' ) }
						value={ attributes.buttonColor }
						onChange={ ( buttonColor ) => setAttributes( { buttonColor } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Button Background Color' ) } colorValue={ attributes.buttonBackgroundColor } initialOpen={ false }>
					<ColorPalette
						label={ __( 'Background Color' ) }
						value={ attributes.buttonBackgroundColor }
						onChange={ ( buttonBackgroundColor ) => setAttributes( { buttonBackgroundColor } ) }
					/>
				</PanelColor>
			</InspectorControls>
		);

	}

}
