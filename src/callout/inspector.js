/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls, PanelColorSettings } = wp.editor;
const { PanelBody, TextControl, RangeControl } = wp.components;

/**
 * Inspector controls
 */
export default class Inspector extends Component {

	render() {
		const { attributes, setAttributes } = this.props;

		return (
			<InspectorControls>
				<PanelBody initialOpen={ true } title={ __( 'Callout Settings', 'editor-blocks' ) }>
					<RangeControl
						label={ __( 'Font Size', 'editor-blocks' ) }
						value={ attributes.headingSize }
						onChange={ ( headingSize ) => setAttributes( { headingSize } ) }
						min={ 2 }
						max={ 100 }
					/>
				</PanelBody>
				<PanelBody initialOpen={ true } title={ __( 'Button Settings', 'editor-blocks' ) }>
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
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Color Settings', 'editor-blocks' ) }
					colorSettings={ [
						{
							value: attributes.headingColor,
							onChange: ( headingColor ) => setAttributes( { headingColor } ),
							label: __( 'Text Color', 'editor-blocks' ),
						},
						{
							value: attributes.buttonColor,
							onChange: ( buttonColor ) => setAttributes( { buttonColor } ),
							label: __( 'Button Text Color', 'editor-blocks' ),
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
