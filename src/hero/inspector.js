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
				<PanelBody initialOpen={ true } title={ __( 'Positioning', 'editor-blocks' ) }>
					<RangeControl
						label={ __( 'Width (px)', 'editor-blocks' ) }
						value={ attributes.width }
						onChange={ ( width ) => setAttributes( { width } ) }
						min={ 0 }
						max={ 1000 }
					/>
					<SelectControl
						label={ __( 'Position', 'editor-blocks' ) }
						value={ attributes.position }
						onChange={ ( position ) => setAttributes( { position } ) }
						options={ [
							{ value: 'left', label: __( 'Left', 'editor-blocks' ) },
							{ value: 'center', label: __( 'Center', 'editor-blocks' ) },
							{ value: 'right', label: __( 'Right', 'editor-blocks' ) },
						] }
					/>
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Color Settings', 'editor-blocks' ) }
					colorSettings={ [
						{
							value: attributes.headingColor,
							onChange: ( headingColor ) => setAttributes( { headingColor } ),
							label: __( 'Heading Color', 'editor-blocks' ),
						},
						{
							value: attributes.textColor,
							onChange: ( textColor ) => setAttributes( { textColor } ),
							label: __( 'Text Color', 'editor-blocks' ),
						},
					] }
				>
				</PanelColorSettings>
				<PanelBody initialOpen={ false } title={ __( 'Button Settings', 'editor-blocks' ) }>
					<ToggleControl
						label={ __( 'Show Button', 'editor-blocks' ) }
						checked={ !! attributes.showButton }
						help={ ( checked ) => checked ? __( 'Button is visible.', 'editor-blocks' ) : __( 'Button is not visible.', 'editor-blocks' ) }
						onChange={ ( showButton ) => setAttributes( { showButton } ) }
					/>
					{ attributes.showButton && (
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
					) }
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Button Color Settings', 'editor-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: attributes.buttonColor,
							onChange: ( buttonColor ) => setAttributes( { buttonColor } ),
							label: __( 'Button Text Color', 'editor-blocks' ),
							initialOpen: false,
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
