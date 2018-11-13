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
				<PanelColorSettings
					title={ __( 'Color Settings' ) }
					colorSettings={ [
						{
							value: attributes.headingColor,
							onChange: ( headingColor ) => setAttributes( { headingColor } ),
							label: __( 'Heading Color' ),
						},
						{
							value: attributes.textColor,
							onChange: ( textColor ) => setAttributes( { textColor } ),
							label: __( 'Text Color' ),
						},
					] }
				>
				</PanelColorSettings>
				<PanelBody initialOpen={ false } title={ __( 'Button Settings' ) }>
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
				<PanelColorSettings
					title={ __( 'Button Color Settings' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: attributes.buttonColor,
							onChange: ( buttonColor ) => setAttributes( { buttonColor } ),
							label: __( 'Button Text Color' ),
							initialOpen: false,
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
