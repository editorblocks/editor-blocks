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
				<PanelBody initialOpen={ true } title={ __( 'Positioning' ) }>
					<RangeControl
						label={ __( 'Max Width (px)' ) }
						value={ attributes.maxWidth }
						onChange={ ( maxWidth ) => setAttributes( { maxWidth } ) }
						min={ 100 }
						max={ 1040 }
					/>
				</PanelBody>
				<PanelColor title={ __( 'Heading' ) } colorValue={ attributes.headingColor } initialOpen={ true }>
					<ColorPalette
						label={ __( 'Color' ) }
						value={ attributes.headingColor }
						onChange={ ( headingColor ) => setAttributes( { headingColor } ) }
					/>
					<RangeControl
						label={ __( 'Font Size' ) }
						value={ attributes.headingSize }
						onChange={ ( headingSize ) => setAttributes( { headingSize } ) }
						min={ 2 }
						max={ 100 }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Subheading' ) } colorValue={ attributes.subheadingColor } initialOpen={ true }>
					<ColorPalette
						label={ __( 'Text Color' ) }
						value={ attributes.subheadingColor }
						onChange={ ( subheadingColor ) => setAttributes( { subheadingColor } ) }
					/>
					<RangeControl
						label={ __( 'Font Size' ) }
						value={ attributes.subheadingSize }
						onChange={ ( subheadingSize ) => setAttributes( { subheadingSize } ) }
						min={ 2 }
						max={ 100 }
					/>
				</PanelColor>
			</InspectorControls>
		);

	}

}
