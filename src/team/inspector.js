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
				<PanelBody initialOpen={ true } title={ __( 'Team Settings' ) }>
					<RangeControl
						label={ __( 'Members' ) }
						value={ attributes.count }
						onChange={ ( count ) => setAttributes( { count } ) }
						min={ 2 }
						max={ 4 }
					/>
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Color Settings' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: attributes.nameColor,
							onChange: ( nameColor ) => setAttributes( { nameColor } ),
							label: __( 'Name Color' ),
						},
						{
							value: attributes.positionColor,
							onChange: ( positionColor ) => setAttributes( { positionColor } ),
							label: __( 'Position Color' ),
						},
						{
							value: attributes.bioColor,
							onChange: ( bioColor ) => setAttributes( { bioColor } ),
							label: __( 'Bio Color' ),
						},
					] }
				>
				</PanelColorSettings>
			</InspectorControls>
		);

	}

}
