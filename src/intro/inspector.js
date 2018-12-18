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
			<InspectorControls key="inspector">
				<PanelBody initialOpen={ true } title={ __( 'Sizing', 'editor-blocks' ) }>
					<RangeControl
						label={ __( 'Max Width (px)', 'editor-blocks' ) }
						value={ attributes.maxWidth }
						onChange={ ( maxWidth ) => setAttributes( { maxWidth } ) }
						min={ 100 }
						max={ 1040 }
					/>
					<RangeControl
						label={ __( 'Font Size', 'editor-blocks' ) }
						value={ attributes.headingSize }
						onChange={ ( headingSize ) => setAttributes( { headingSize } ) }
						min={ 2 }
						max={ 100 }
					/>
					<RangeControl
						label={ __( 'Font Size', 'editor-blocks' ) }
						value={ attributes.subheadingSize }
						onChange={ ( subheadingSize ) => setAttributes( { subheadingSize } ) }
						min={ 2 }
						max={ 100 }
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
							value: attributes.subheadingColor,
							onChange: ( subheadingColor ) => setAttributes( { subheadingColor } ),
							label: __( 'Text Color', 'editor-blocks' ),
						},
					] }
				>
				</PanelColorSettings>
			</InspectorControls>
		);
	}

}
