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

	onChangeButtonURL = ( index, value ) => {
		const newColumns = this.props.attributes.columns;
		if ( newColumns[ index ] === undefined ) {
			newColumns[ index ] = {};
		}
		const column = newColumns[ index ];
		column.buttonURL = value;
		this.props.setAttributes( { columns: [ ...newColumns ] } );
	}

	render() {

		const { attributes, setAttributes } = this.props;
		const { count, columnBackgroundColor, headingColor, descriptionColor, priceColor, featuresColor, buttonBackgroundColor, buttonColor, columns } = attributes;

		const ONE_TO_TEN = [ 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten' ];

		return (
			<InspectorControls key="inspector">
				<PanelBody initialOpen={ true } title={ __( 'Feature Settings' ) }>
					<RangeControl
						label={ __( 'Columns' ) }
						value={ count }
						onChange={ ( count ) => setAttributes( { count } ) }
						min={ 1 }
		        max={ 5 }
					/>
				</PanelBody>
				<PanelBody initialOpen={ true } title={ __( 'Button Settings' ) }>
					{ _times( count, ( index ) => {
						return (
							<TextControl
								label={ __( 'Button ' + ONE_TO_TEN[ index ] + ' URL' ) }
								value={ _get( columns, [ index, 'buttonURL' ] ) }
								onChange={ ( value ) => this.onChangeButtonURL( index, value ) }
							/>
						);
					} ) }
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Color Settings' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: columnBackgroundColor,
							onChange: ( columnBackgroundColor ) => setAttributes( { columnBackgroundColor } ),
							label: __( 'Column Background Color' ),
						},
						{
							value: headingColor,
							onChange: ( headingColor ) => setAttributes( { headingColor } ),
							label: __( 'Heading Color' ),
						},
						{
							value: descriptionColor,
							onChange: ( descriptionColor ) => setAttributes( { descriptionColor } ),
							label: __( 'Description Color' ),
						},
						{
							value: priceColor,
							onChange: ( priceColor ) => setAttributes( { priceColor } ),
							label: __( 'Price Color' ),
						},
						{
							value: featuresColor,
							onChange: ( featuresColor ) => setAttributes( { featuresColor } ),
							label: __( 'Features Color' ),
						},
						{
							value: buttonColor,
							onChange: ( buttonColor ) => setAttributes( { buttonColor } ),
							label: __( 'Button Color' ),
						},
						{
							value: buttonBackgroundColor,
							onChange: ( buttonBackgroundColor ) => setAttributes( { buttonBackgroundColor } ),
							label: __( 'Button Background Color' ),
						},
					] }
				>
				</PanelColorSettings>
			</InspectorControls>
		);
	}
}
