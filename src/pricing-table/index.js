/**
 * BLOCK: Features
 */

import './style.scss';
import './editor.scss';
import Inspector from './inspector';
import _get from 'lodash/get';
import _times from 'lodash/times';

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { MediaUpload, RichText, BlockControls, AlignmentToolbar } = wp.editor;
const { Button, Dashicon } = wp.components;

registerBlockType( 'editor-blocks/pricing-table', {
	title: __( 'Pricing Table (EB)', 'editor-blocks' ),
	description: __( 'Beautiful 2, 3, 4 or 5 column pricing tables', 'editor-blocks' ),
	icon: 'cart',
	category: 'editor-blocks',
	keywords: [
		__( 'Pricing Table', 'editor-blocks' ),
		__( 'Editor Blocks', 'editor-blocks' ),
		__( 'EB', 'editor-blocks' ),
	],
	attributes: {
		columns: {
			type: 'array',
			selector: '.column',
			source: 'query',
			query: {
				image: { source: 'attribute', selector: '.pricing-table__image', attribute: 'src' },
				heading: { source: 'children', selector: '.pricing-table__heading' },
				description: { source: 'children', selector: '.pricing-table__description' },
				price: { source: 'children', selector: '.pricing-table__price' },
				features: { source: 'children', selector: '.pricing-table__features' },
				buttonText: { source: 'children', selector: '.pricing-table__button' },
				buttonURL: { source: 'attribute', selector: '.pricing-table__button', attribute: 'href' },
			},
			default: [],
		},
		count: {
			type: 'number',
			default: 3,
		},
		alignment: {
			type: 'string',
			default: 'center',
		},
		columnBackgroundColor: {
			type: 'string',
		},
		headingColor: {
			type: 'string',
		},
		descriptionColor: {
			type: 'string',
		},
		priceColor: {
			type: 'string',
		},
		featuresColor: {
			type: 'string',
		},
		buttonColor: {
			type: 'string',
			default: '#ffffff',
		},
		buttonBackgroundColor: {
			type: 'string',
			default: '#bc0d0d',
		},
	},

	edit: function( props ) {
		const { attributes, setAttributes, className } = props;
		const columnClasses = className + ' col-' + attributes.count;

		function onChangeColumn( value, i, attribute ) {
			const columns = attributes.columns;
			const newColumns = columns;
			newColumns[ i ] = Object.assign( {}, columns[ i ] );
			newColumns[ i ][ attribute ] = value;
			setAttributes( { columns: [ ...newColumns ] } );
		}

		function onChangeColumnImage( value, i ) {
			const columns = attributes.columns;
			const newColumns = columns;
			newColumns[ i ] = Object.assign( {}, columns[ i ] );
			newColumns[ i ].image = value.url;
			setAttributes( { columns: [ ...newColumns ] } );
		}

		return (
			<Fragment>
				<Inspector { ...props } />
				<BlockControls key="controls">
					<AlignmentToolbar
						value={ attributes.alignment }
						onChange={ ( alignment ) => setAttributes( { alignment } ) }
					/>
				</BlockControls>
				<div style={ { textAlign: attributes.alignment } } className={ columnClasses }>
					{ _times( attributes.count, ( index ) => {
						const image = _get( attributes.columns, [ index, 'image' ] );
						const columnClass = 'column column-' + index;
						return (
							<div className={ columnClass } key={ `column-${ index }` } style={ { backgroundColor: attributes.columnBackgroundColor } }>
								<MediaUpload
									onSelect={ ( value ) => onChangeColumnImage( value, index ) }
									type="image"
									value={ image }
									render={ ( { open } ) => (
										<Button onClick={ open }>
											{ ! image ?
												<div className="no-image"><Dashicon icon="format-image" /></div> :
												<img
													className="pricing-table__image"
													src={ image }
													alt={ __( 'Column', 'editor-blocks' ) }
												/>
											}
										</Button>
									) }
								>
								</MediaUpload>
								<RichText
									value={ _get( attributes.columns, [ index, 'heading' ] ) }
									onChange={ ( value ) => onChangeColumn( value, index, 'heading' ) }
									tagName="h3"
									placeholder={ __( 'Heading', 'editor-blocks' ) }
									keepPlaceholderOnFocus={ true }
									style={ { color: attributes.headingColor } }
									className="pricing-table__heading"
								/>
								<RichText
									value={ _get( attributes.columns, [ index, 'description' ] ) }
									onChange={ ( value ) => onChangeColumn( value, index, 'description' ) }
									tagName="p"
									placeholder={ __( 'Description', 'editor-blocks' ) }
									keepPlaceholderOnFocus={ true }
									style={ { color: attributes.descriptionColor } }
									className="pricing-table__description"
								/>
								<RichText
									value={ _get( attributes.columns, [ index, 'price' ] ) }
									onChange={ ( value ) => onChangeColumn( value, index, 'price' ) }
									tagName="p"
									placeholder={ __( '$49.99', 'editor-blocks' ) }
									formattingControls={ [] }
									keepPlaceholderOnFocus={ true }
									style={ { color: attributes.priceColor } }
									className="pricing-table__price"
								/>
								<RichText
									value={ _get( attributes.columns, [ index, 'features' ] ) }
									onChange={ ( value ) => onChangeColumn( value, index, 'features' ) }
									tagName="ul"
									multiline="li"
									placeholder={ __( 'Feature One', 'editor-blocks' ) }
									formattingControls={ [] }
									keepPlaceholderOnFocus={ true }
									style={ { color: attributes.featuresColor } }
									className="pricing-table__features"
								/>
								<div className="button-container">
									<RichText
										value={ _get( attributes.columns, [ index, 'buttonText' ], 'Click Here!' ) }
										onChange={ ( value ) => onChangeColumn( value, index, 'buttonText' ) }
										tagName="a"
										formattingControls={ [] }
										keepPlaceholderOnFocus={ true }
										style={ { backgroundColor: attributes.buttonBackgroundColor, color: attributes.buttonColor } }
										className="pricing-table__button"
									/>
								</div>
							</div>
						);
					} ) }
				</div>
			</Fragment>
		);
	},

	save: function( props ) {
		const { attributes } = props;
		const columnClasses = 'col-' + attributes.count;

		return (
			<div className={ columnClasses } style={ { textAlign: attributes.alignment } }>
				{ _times( attributes.count, ( index ) => {
					const image = _get( attributes.columns, [ index, 'image' ] );
					const columnClass = 'column column-' + index;
					return (
						<div className={ columnClass } key={ `column-${ index }` } style={ { backgroundColor: attributes.columnBackgroundColor } }>
							{ image &&
								<img
									className="pricing-table__image"
									src={ image }
									alt="Pricing Table Image"
								/>
							}
							<RichText.Content
								tagName="h3"
								value={ _get( attributes.columns, [ index, 'heading' ] ) }
								style={ { color: attributes.headingColor } }
								className="pricing-table__heading"
							/>
							<RichText.Content
								tagName="p"
								value={ _get( attributes.columns, [ index, 'description' ] ) }
								style={ { color: attributes.descriptionColor } }
								className="pricing-table__description"
							/>
							<RichText.Content
								tagName="p"
								value={ _get( attributes.columns, [ index, 'price' ] ) }
								style={ { color: attributes.priceColor } }
								className="pricing-table__price"
							/>
							<RichText.Content
								tagName="ul"
								value={ _get( attributes.columns, [ index, 'features' ] ) }
								style={ { color: attributes.featuresColor } }
								className="pricing-table__features"
							/>
							<div className="button-container">
								<RichText.Content
									tagName="a"
									href={ _get( attributes.columns, [ index, 'buttonURL' ] ) }
									style={ { backgroundColor: attributes.buttonBackgroundColor, color: attributes.buttonColor } }
									value={ _get( attributes.columns, [ index, 'buttonText' ], 'Click Here!' ) }
									className="pricing-table__button"
								/>
							</div>
						</div>
					);
				} ) }

			</div>
		);
	},

} );
