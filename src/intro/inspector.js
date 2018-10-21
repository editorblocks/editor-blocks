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

		const {
			attributes,
			setAttributes
		} = this.props;

		const { maxWidth, headingColor, headingSize, showSubheading, subheadingColor, subheadingSize } = attributes;

		return (
			<InspectorControls key="inspector">
				<PanelBody initialOpen={ true } title={ __( 'Positioning' ) }>
					<RangeControl
						label={ __( 'Max Width (px)' ) }
						value={ maxWidth }
						onChange={ ( maxWidth ) => setAttributes( { maxWidth } ) }
						min={ 100 }
						max={ 1040 }
					/>
				</PanelBody>
				<PanelColor title={ __( 'Heading' ) } colorValue={ headingColor } initialOpen={ true }>
					<ColorPalette
						label={ __( 'Color' ) }
						value={ headingColor }
						onChange={ ( headingColor ) => setAttributes( { headingColor } ) }
					/>
					<RangeControl
						label={ __( 'Font Size' ) }
						value={ headingSize }
						onChange={ ( headingSize ) => setAttributes( { headingSize } ) }
						min={ 2 }
						max={ 100 }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Subheading' ) } colorValue={ subheadingColor } initialOpen={ true }>
					<ColorPalette
						label={ __( 'Text Color' ) }
						value={ subheadingColor }
						onChange={ ( subheadingColor ) => setAttributes( { subheadingColor } ) }
					/>
					<RangeControl
						label={ __( 'Font Size' ) }
						value={ subheadingSize }
						onChange={ ( subheadingSize ) => setAttributes( { subheadingSize } ) }
						min={ 2 }
						max={ 100 }
					/>
				</PanelColor>
			</InspectorControls>
		);
	}
}
