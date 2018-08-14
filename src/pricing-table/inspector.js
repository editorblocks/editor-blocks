/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls, ColorPalette } = wp.editor;
const { PanelBody, PanelColor, RangeControl } = wp.components;

/**
 * Inspector controls
 */
export default class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			setAttributes
		} = this.props;

		const { style, count, columnBackgroundColor, headingColor, descriptionColor, priceColor, featuresColor, buttonBackgroundColor, buttonColor } = attributes;

		return (
			<InspectorControls key="inspector">
				<PanelBody initialOpen={ true } title={ __( 'Feature Settings' ) }>
					<RangeControl
						label={ __( 'Columns' ) }
						value={ count }
						onChange={ ( count ) => setAttributes( { count } ) }
						min={ 1 }
		        max={ 5 }
					/>
				</PanelBody>
				<PanelColor title={ __( 'Column Background Color' ) } colorValue={ columnBackgroundColor } initialOpen={ false }>
					<ColorPalette
					label={ __( 'Column Background Color' ) }
					value={ columnBackgroundColor }
					onChange={ ( columnBackgroundColor ) => setAttributes( { columnBackgroundColor } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Heading Color' ) } colorValue={ headingColor } initialOpen={ false }>
					<ColorPalette
						label={ __( 'Heading Color' ) }
						value={ headingColor }
						onChange={ ( headingColor ) => setAttributes( { headingColor } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Description Color' ) } colorValue={ descriptionColor } initialOpen={ false }>
					<ColorPalette
						label={ __( 'Text Color' ) }
						value={ descriptionColor }
						onChange={ ( descriptionColor ) => setAttributes( { descriptionColor } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Price Color' ) } colorValue={ priceColor } initialOpen={ false }>
					<ColorPalette
						label={ __( 'Text Color' ) }
						value={ priceColor }
						onChange={ ( priceColor ) => setAttributes( { priceColor } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Features Color' ) } colorValue={ featuresColor } initialOpen={ false }>
					<ColorPalette
						label={ __( 'Text Color' ) }
						value={ featuresColor }
						onChange={ ( featuresColor ) => setAttributes( { featuresColor } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Button Text Color' ) } colorValue={ buttonColor } initialOpen={ false }>
					<ColorPalette
						label={ __( 'Button Text Color' ) }
						value={ buttonColor }
						onChange={ ( buttonColor ) => setAttributes( { buttonColor } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Button Background Color' ) } colorValue={ buttonBackgroundColor } initialOpen={ false }>
					<ColorPalette
						label={ __( 'Button Background Color' ) }
						value={ buttonBackgroundColor }
						onChange={ ( buttonBackgroundColor ) => setAttributes( { buttonBackgroundColor } ) }
					/>
				</PanelColor>
			</InspectorControls>
		);
	}
}
