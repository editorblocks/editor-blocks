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

		const { maxWidth, testimonialColor, testimonialSize, authorImageSize, authorColor, authorSize } = attributes;

		return (
			<InspectorControls key="inspector">
				<PanelBody initialOpen={ true } title={ __( 'General' ) }>
					<RangeControl
						label={ __( 'Max Width (px)' ) }
						value={ maxWidth }
						onChange={ ( maxWidth ) => setAttributes( { maxWidth } ) }
						min={ 100 }
						max={ 1040 }
					/>
					<RangeControl
						label={ __( 'Image Size (px)' ) }
						value={ authorImageSize }
						onChange={ ( authorImageSize ) => setAttributes( { authorImageSize } ) }
						min={ 10 }
						max={ 300 }
					/>
				</PanelBody>
				<PanelColor title={ __( 'Testimonial' ) } colorValue={ testimonialColor } initialOpen={ true }>
					<ColorPalette
						label={ __( 'Color' ) }
						value={ testimonialColor }
						onChange={ ( testimonialColor ) => setAttributes( { testimonialColor } ) }
					/>
					<RangeControl
						label={ __( 'Font Size (px)' ) }
						value={ testimonialSize }
						onChange={ ( testimonialSize ) => setAttributes( { testimonialSize } ) }
						min={ 10 }
						max={ 50 }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Author Attribution' ) } colorValue={ authorColor } initialOpen={ true }>
					<ColorPalette
						label={ __( 'Text Color' ) }
						value={ authorColor }
						onChange={ ( authorColor ) => setAttributes( { authorColor } ) }
					/>
					<RangeControl
						label={ __( 'Font Size (px)' ) }
						value={ authorSize }
						onChange={ ( authorSize ) => setAttributes( { authorSize } ) }
						min={ 10 }
						max={ 30 }
					/>
				</PanelColor>
			</InspectorControls>
		);
	}
}
