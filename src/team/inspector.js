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

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			setAttributes
		} = this.props;

		const { count, nameColor, positionColor, bioColor } = attributes;

		return (
			<InspectorControls key="inspector">
				<PanelBody initialOpen={ true } title={ __( 'Team Settings' ) }>
					<RangeControl
						label={ __( 'Members' ) }
						value={ count }
						onChange={ ( count ) => setAttributes( { count } ) }
						min={ 2 }
		        max={ 4 }
					/>
				</PanelBody>
				<PanelColor title={ __( 'Name Color' ) } colorValue={ nameColor } initialOpen={ false }>
					<ColorPalette
						label={ __( 'Name Color' ) }
						value={ nameColor }
						onChange={ ( nameColor ) => setAttributes( { nameColor } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Position Color' ) } colorValue={ positionColor } initialOpen={ false }>
					<ColorPalette
						label={ __( 'Position Color' ) }
						value={ positionColor }
						onChange={ ( positionColor ) => setAttributes( { positionColor } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Bio Color' ) } colorValue={ bioColor } initialOpen={ false }>
					<ColorPalette
						label={ __( 'Bio Color' ) }
						value={ bioColor }
						onChange={ ( bioColor ) => setAttributes( { bioColor } ) }
					/>
				</PanelColor>
			</InspectorControls>
		);
	}
}
