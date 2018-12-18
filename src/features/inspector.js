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
				<PanelBody initialOpen={ true } title={ __( 'Feature Settings', 'editor-blocks' ) }>
					<RangeControl
						label={ __( 'Columns', 'editor-blocks' ) }
						value={ attributes.count }
						onChange={ ( count ) => setAttributes( { count } ) }
						min={ 2 }
						max={ 6 }
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
			</InspectorControls>
		);
	}

}
