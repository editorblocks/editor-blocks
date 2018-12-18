/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody, RangeControl } = wp.components;

/**
 * Inspector controls
 */
export default class Inspector extends Component {

	render() {
		const { attributes, setAttributes } = this.props;

		return (
			<InspectorControls key="inspector">
				<PanelBody initialOpen={ true } title={ __( 'Brands Settings', 'editor-blocks' ) }>
					<RangeControl
						label={ __( 'Brands', 'editor-blocks' ) }
						value={ attributes.count }
						onChange={ ( count ) => setAttributes( { count } ) }
						min={ 2 }
						max={ 6 }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}

}
