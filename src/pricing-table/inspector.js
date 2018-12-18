/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls, PanelColorSettings } = wp.editor;
const { PanelBody, RangeControl, TextControl } = wp.components;
import _times from 'lodash/times';
import _get from 'lodash/get';

/**
 * Inspector controls
 */
export default class Inspector extends Component {

	onChangeButtonURL( index, value ) {
		const columns = this.props.attributes.columns;
		const newColumns = columns.slice();
		newColumns[ index ] = Object.assign( {}, columns[ index ] );
		const column = newColumns[ index ];
		column.buttonURL = value;
		this.props.setAttributes( { columns: [ ...newColumns ] } );
	}

	render() {
		const { attributes, setAttributes } = this.props;

		const ONE_TO_TEN = [ 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten' ];

		return (
			<InspectorControls key="inspector">
				<PanelBody initialOpen={ true } title={ __( 'Feature Settings', 'editor-blocks' ) }>
					<RangeControl
						label={ __( 'Columns' ) }
						value={ attributes.count }
						onChange={ ( count ) => setAttributes( { count } ) }
						min={ 1 }
						max={ 5 }
					/>
				</PanelBody>
				<PanelBody initialOpen={ true } title={ __( 'Button Settings', 'editor-blocks' ) }>
					{ _times( attributes.count, ( index ) => {
						return (
							<TextControl
								label={ __( 'Button ' + ONE_TO_TEN[ index ] + ' URL' ) }
								value={ _get( attributes.columns, [ index, 'buttonURL' ] ) }
								onChange={ ( value ) => this.onChangeButtonURL( index, value ) }
							/>
						);
					} ) }
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Color Settings', 'editor-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: attributes.columnBackgroundColor,
							onChange: ( columnBackgroundColor ) => setAttributes( { columnBackgroundColor } ),
							label: __( 'Column Background Color', 'editor-blocks' ),
						},
						{
							value: attributes.headingColor,
							onChange: ( headingColor ) => setAttributes( { headingColor } ),
							label: __( 'Heading Color', 'editor-blocks' ),
						},
						{
							value: attributes.descriptionColor,
							onChange: ( descriptionColor ) => setAttributes( { descriptionColor } ),
							label: __( 'Description Color', 'editor-blocks' ),
						},
						{
							value: attributes.priceColor,
							onChange: ( priceColor ) => setAttributes( { priceColor } ),
							label: __( 'Price Color', 'editor-blocks' ),
						},
						{
							value: attributes.featuresColor,
							onChange: ( featuresColor ) => setAttributes( { featuresColor } ),
							label: __( 'Features Color', 'editor-blocks' ),
						},
						{
							value: attributes.buttonColor,
							onChange: ( buttonColor ) => setAttributes( { buttonColor } ),
							label: __( 'Button Color', 'editor-blocks' ),
						},
						{
							value: attributes.buttonBackgroundColor,
							onChange: ( buttonBackgroundColor ) => setAttributes( { buttonBackgroundColor } ),
							label: __( 'Button Background Color', 'editor-blocks' ),
						},
					] }
				>
				</PanelColorSettings>
			</InspectorControls>
		);
	}

}
