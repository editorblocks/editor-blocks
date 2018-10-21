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

	render() {

		const { attributes, setAttributes } = this.props;

		return (
			<InspectorControls key="inspector">
				<PanelBody initialOpen={ true } title={ __( 'Feature Settings' ) }>
					<RangeControl
						label={ __( 'Columns' ) }
						value={ attributes.count }
						onChange={ ( count ) => setAttributes( { count } ) }
						min={ 2 }
						max={ 6 }
					/>
				</PanelBody>
				<PanelColor title={ __( 'Heading Color' ) } colorValue={ attributes.headingColor } initialOpen={ true }>
					<ColorPalette
						label={ __( 'Heading Color' ) }
						value={ attributes.headingColor }
						onChange={ ( headingColor ) => setAttributes( { headingColor } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Text Color' ) } colorValue={ attributes.textColor } initialOpen={ true }>
					<ColorPalette
						label={ __( 'Text Color' ) }
						value={ attributes.textColor }
						onChange={ ( textColor ) => setAttributes( { textColor } ) }
					/>
				</PanelColor>
			</InspectorControls>
		);

	}

}
