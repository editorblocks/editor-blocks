/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { InspectorControls, ColorPalette } = wp.editor;
const { PanelBody, PanelColor, TextControl, SelectControl, RangeControl, ToggleControl } = wp.components;

/**
 * Inspector controls
 */
export default class Inspector extends Component {

	render() {

		const { attributes, setAttributes } = this.props;

		return (
			<InspectorControls key="inspector">
				<PanelBody initialOpen={ true } title={ __( 'Positioning' ) }>
					<RangeControl
						label={ __( 'Width (px)' ) }
						value={ attributes.width }
						onChange={ ( width ) => setAttributes( { width } ) }
						min={ 0 }
						max={ 1000 }
					/>
					<SelectControl
						label={ __( 'Position' ) }
						value={ attributes.position }
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
						checked={ !! attributes.showButton }
						help={ ( checked ) => checked ? __( 'Button is visible.' ) : __( 'Button is not visible.' ) }
						onChange={ ( showButton ) => setAttributes( { showButton } ) }
					/>
					{ attributes.showButton && (
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
					) }
				</PanelBody>
				<PanelColor title={ __( 'Heading Color' ) } colorValue={ attributes.headingColor } initialOpen={ false }>
					<ColorPalette
						label={ __( 'Heading Color' ) }
						value={ attributes.headingColor }
						onChange={ ( headingColor ) => setAttributes( { headingColor } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Text Color' ) } colorValue={ attributes.textColor } initialOpen={ false }>
					<ColorPalette
						label={ __( 'Text Color' ) }
						value={ attributes.textColor }
						onChange={ ( textColor ) => setAttributes( { textColor } ) }
					/>
				</PanelColor>
				{ attributes.showButton && (
					<Fragment>
						<PanelColor title={ __( 'Button Text Color' ) } colorValue={ attributes.buttonColor } initialOpen={ false }>
							<ColorPalette
								label={ __( 'Button Text Color' ) }
								value={ attributes.buttonColor }
								onChange={ ( buttonColor ) => setAttributes( { buttonColor } ) }
							/>
						</PanelColor>
						<PanelColor title={ __( 'Button Background Color' ) } colorValue={ attributes.buttonBackgroundColor } initialOpen={ false }>
							<ColorPalette
								label={ __( 'Button Background Color' ) }
								value={ attributes.buttonBackgroundColor }
								onChange={ ( buttonBackgroundColor ) => setAttributes( { buttonBackgroundColor } ) }
							/>
						</PanelColor>
					</Fragment>
				) }
			</InspectorControls>
		);

	}

}
