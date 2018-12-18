/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls, PanelColorSettings } = wp.editor;
const { PanelBody, RangeControl } = wp.components;

/**
 * Inspector controls
 */
export default class Inspector extends Component {

	render() {
		const { attributes, setAttributes } = this.props;

		return (
			<InspectorControls>
				<PanelBody initialOpen={ true } title={ __( 'General', 'editor-blocks' ) }>
					<RangeControl
						label={ __( 'Max Width (px)', 'editor-blocks' ) }
						value={ attributes.maxWidth }
						onChange={ ( maxWidth ) => setAttributes( { maxWidth } ) }
						min={ 100 }
						max={ 1040 }
					/>
					<RangeControl
						label={ __( 'Image Size (px)', 'editor-blocks' ) }
						value={ attributes.authorImageSize }
						onChange={ ( authorImageSize ) => setAttributes( { authorImageSize } ) }
						min={ 10 }
						max={ 300 }
					/>
					<RangeControl
						label={ __( 'Font Size (px)', 'editor-blocks' ) }
						value={ attributes.testimonialSize }
						onChange={ ( testimonialSize ) => setAttributes( { testimonialSize } ) }
						min={ 10 }
						max={ 50 }
					/>
					<RangeControl
						label={ __( 'Font Size (px)', 'editor-blocks' ) }
						value={ attributes.authorSize }
						onChange={ ( authorSize ) => setAttributes( { authorSize } ) }
						min={ 10 }
						max={ 30 }
					/>
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Color Settings', 'editor-blocks' ) }
					colorSettings={ [
						{
							value: attributes.testimonialColor,
							onChange: ( testimonialColor ) => setAttributes( { testimonialColor } ),
							label: __( 'Testimonial Color', 'editor-blocks' ),
						},
						{
							value: attributes.authorColor,
							onChange: ( authorColor ) => setAttributes( { authorColor } ),
							label: __( 'Author Color', 'editor-blocks' ),
						},
					] }
				>
				</PanelColorSettings>
			</InspectorControls>
		);
	}

}
