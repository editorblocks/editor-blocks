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
			<InspectorControls>
				<PanelBody initialOpen={ true } title={ __( 'General' ) }>
					<RangeControl
						label={ __( 'Max Width (px)' ) }
						value={ attributes.maxWidth }
						onChange={ ( maxWidth ) => setAttributes( { maxWidth } ) }
						min={ 100 }
						max={ 1040 }
					/>
					<RangeControl
						label={ __( 'Image Size (px)' ) }
						value={ attributes.authorImageSize }
						onChange={ ( authorImageSize ) => setAttributes( { authorImageSize } ) }
						min={ 10 }
						max={ 300 }
					/>
				</PanelBody>
				<PanelColor title={ __( 'Testimonial' ) } colorValue={ attributes.testimonialColor } initialOpen={ true }>
					<ColorPalette
						label={ __( 'Color' ) }
						value={ attributes.testimonialColor }
						onChange={ ( testimonialColor ) => setAttributes( { testimonialColor } ) }
					/>
					<RangeControl
						label={ __( 'Font Size (px)' ) }
						value={ attributes.testimonialSize }
						onChange={ ( testimonialSize ) => setAttributes( { testimonialSize } ) }
						min={ 10 }
						max={ 50 }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Author Attribution' ) } colorValue={ attributes.authorColor } initialOpen={ true }>
					<ColorPalette
						label={ __( 'Text Color' ) }
						value={ attributes.authorColor }
						onChange={ ( authorColor ) => setAttributes( { authorColor } ) }
					/>
					<RangeControl
						label={ __( 'Font Size (px)' ) }
						value={ attributes.authorSize }
						onChange={ ( authorSize ) => setAttributes( { authorSize } ) }
						min={ 10 }
						max={ 30 }
					/>
				</PanelColor>
			</InspectorControls>
		);

	}

}
