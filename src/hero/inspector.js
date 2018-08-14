/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls, ColorPalette } = wp.editor;
const { PanelBody, PanelColor, TextControl, SelectControl, RangeControl, ToggleControl } = wp.components;

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

		const { width, position, textColor, headingColor, showButton, buttonBackgroundColor, buttonColor, buttonText, buttonURL } = attributes;

		return (
			<InspectorControls key="inspector">
				<PanelBody initialOpen={ true } title={ __( 'Positioning' ) }>
					<RangeControl
						label={ __( 'Width (px)' ) }
						value={ width }
						onChange={ ( width ) => setAttributes( { width } ) }
						min={ 0 }
		        max={ 1000 }
					/>
					<SelectControl
						label={ __( 'Position' ) }
						value={ position }
						onChange={ ( position ) => setAttributes( { position } ) }
						options={ [
							{ value: 'left', label: 'Left' },
							{ value: 'center', label: 'Center' },
							{ value: 'right', label: 'Right' },
						] }
					/>
				</PanelBody>
				<PanelBody initialOpen={ true } title={ __( 'Button Settings' ) }>
					<ToggleControl
						label={ __( 'Show Button' ) }
						checked={ !! showButton }
						help={ ( checked ) => checked ? __( 'Button is visible.' ) : __( 'Button is not visible.' ) }
						onChange={ ( showButton ) => setAttributes( { showButton } ) }
					/>
					{ showButton && [
						<TextControl
							label={ __( 'Button Text' ) }
							value={ buttonText }
							onChange={ ( buttonText ) => setAttributes( { buttonText } ) }
						/>,
						<TextControl
							label={ __( 'Button URL' ) }
							value={ buttonURL }
							onChange={ ( buttonURL ) => setAttributes( { buttonURL } ) }
						/>
					] }
				</PanelBody>
				<PanelColor title={ __( 'Heading Color' ) } colorValue={ headingColor } initialOpen={ false }>
					<ColorPalette
						label={ __( 'Heading Color' ) }
						value={ headingColor }
						onChange={ ( headingColor ) => setAttributes( { headingColor } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Text Color' ) } colorValue={ textColor } initialOpen={ false }>
					<ColorPalette
						label={ __( 'Text Color' ) }
						value={ textColor }
						onChange={ ( textColor ) => setAttributes( { textColor } ) }
					/>
				</PanelColor>
				{ showButton && [
					<PanelColor title={ __( 'Button Text Color' ) } colorValue={ buttonColor } initialOpen={ false }>
						<ColorPalette
							label={ __( 'Button Text Color' ) }
							value={ buttonColor }
							onChange={ ( buttonColor ) => setAttributes( { buttonColor } ) }
						/>
					</PanelColor>,
					<PanelColor title={ __( 'Button Background Color' ) } colorValue={ buttonBackgroundColor } initialOpen={ false }>
						<ColorPalette
							label={ __( 'Button Background Color' ) }
							value={ buttonBackgroundColor }
							onChange={ ( buttonBackgroundColor ) => setAttributes( { buttonBackgroundColor } ) }
						/>
					</PanelColor>
				] }

			</InspectorControls>
		);
	}
}
