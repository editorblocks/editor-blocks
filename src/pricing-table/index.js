/**
 * BLOCK: Features
 */

import './style.scss';
import './editor.scss';
import Inspector from './inspector';
import _get from 'lodash/get';
import _times from 'lodash/times';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { MediaUpload, RichText, BlockControls, AlignmentToolbar } = wp.editor;
const { Button, Dashicon } = wp.components;

registerBlockType( 'editor-blocks/pricing-table', {
	title: __( 'Pricing Table (EB)' ),
	icon: 'cart',
	category: 'editor-blocks',
	keywords: [
		__( 'Pricing Table' ),
		__( 'Editor Blocks' ),
		__( 'EB' ),
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
			default: [ [], [] ]
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

			const { columns, count, alignment } = props.attributes;
			const { className, setAttributes } = props;
			const { columnBackgroundColor, headingColor, descriptionColor, priceColor, featuresColor, buttonColor, buttonBackgroundColor } = props.attributes;
			const columnClasses = className  + ' col-' + count;

			function onChangeColumn( value, i, attribute ) {
				const newColumns = columns;
				if( newColumns[i] === undefined ) {
					newColumns[i] = {}
				}
				const column = newColumns[i];
				column[attribute] = value;
				setAttributes( { columns: [ ...newColumns ] } );
			}

			function onChangeColumnImage( value, i ) {
				const newColumns = columns;
				if( newColumns[i] === undefined ) {
					newColumns[i] = {}
				}
				const column = newColumns[i];
				column['image'] = value.url;
				setAttributes( { columns: [ ...newColumns ] } );
			}

			return [
				<Inspector
					{ ...props }
				/>,
				<BlockControls key="controls">
					<AlignmentToolbar
						value={ alignment }
						onChange={ ( alignment ) => setAttributes( { alignment } ) }
					/>
				</BlockControls>,
				<div style={ { textAlign: alignment } } className={ columnClasses }>
				{ _times( count, ( index ) => {
				const image = _get( columns, [ index, 'image' ] )
				const columnClass = 'column column-' + index;
					return (
						<div className={ columnClass } key={ `column-${ index }` } style={ { backgroundColor: columnBackgroundColor } }>
							<MediaUpload
								onSelect={ ( value ) => onChangeColumnImage( value, index ) }
								type="image"
								value={ image }
								render={ ( { open } ) => (
									<Button onClick={ open }>
										{ ! image ? <div className="no-image"><Dashicon icon="format-image" /></div> :
											<img
												className="pricing-table__image"
												src={ image }
												alt="Column Image"
											/>
										}
									</Button>
								) }
							>
						</MediaUpload>
							<RichText
								value={ _get( columns, [ index, 'heading' ] ) }
								onChange={ ( value ) => onChangeColumn( value, index, 'heading' ) }
								tagName='h3'
								placeholder={ __( 'Heading' ) }
								keepPlaceholderOnFocus={ true }
								style={ { color: headingColor } }
								className="pricing-table__heading"
							/>
							<RichText
								value={ _get( columns, [ index, 'description' ] ) }
								onChange={ ( value ) => onChangeColumn( value, index, 'description' ) }
								tagName='p'
								placeholder={ __( 'Description' ) }
								keepPlaceholderOnFocus={ true }
								style={ { color: descriptionColor } }
								className="pricing-table__description"
							/>
							<RichText
								value={ _get( columns, [ index, 'price' ] ) }
								onChange={ ( value ) => onChangeColumn( value, index, 'price' ) }
								tagName='p'
								placeholder={ __( '$49.99' ) }
								formattingControls={[]}
								keepPlaceholderOnFocus={ true }
								style={ { color: priceColor } }
								className="pricing-table__price"
							/>
							<RichText
								value={ _get( columns, [ index, 'features' ] ) }
								onChange={ ( value ) => onChangeColumn( value, index, 'features' ) }
								tagName='ul'
								multiline="li"
								placeholder={ __( 'Feature One' ) }
								formattingControls={[]}
								keepPlaceholderOnFocus={ true }
								style={ { color: featuresColor } }
								className="pricing-table__features"
							/>
							<div className="button-container">
								<RichText
									value={ _get( columns, [ index, 'buttonText' ], 'Click Here!' ) }
									onChange={ ( value ) => onChangeColumn( value, index, 'buttonText' ) }
									tagName='a'
									formattingControls={[]}
									placeholder={ __( 'Feature One' ) }
									keepPlaceholderOnFocus={ true }
									style={ {  backgroundColor: buttonBackgroundColor, color: buttonColor } }
									className="pricing-table__button"
								/>
							</div>
					</div>
					);
					} ) }
				</div>
			];

		},

	save: function( props ) {

		const { columns, count, alignment } = props.attributes;
		const { columnBackgroundColor, headingColor, descriptionColor, priceColor, featuresColor, buttonColor, buttonBackgroundColor  } = props.attributes;
		const columnClasses = 'col-' + count;

		return (
			<div className={ columnClasses } style={ { textAlign: alignment } }>
			{ _times( count, ( index ) => {
				const image = _get( columns, [ index, 'image' ] );
				const columnClass = 'column column-' + index;
				return (
					<div className={ columnClass } key={ `column-${ index }` } style={ { backgroundColor: columnBackgroundColor } }>
						{ image &&
								<img
									className="pricing-table__image"
									src={ image }
									alt="Pricing Table Image"
								/>
						}
						<RichText.Content
							tagName="h3"
							value={ _get( columns, [ index, 'heading' ] ) }
							style={ { color: headingColor } }
							className="pricing-table__heading"
						/>
						<RichText.Content
							tagName="p"
							value={ _get( columns, [ index, 'description' ] ) }
							style={ { color: descriptionColor } }
							className="pricing-table__description"
						/>
						<RichText.Content
							tagName="p"
							value={ _get( columns, [ index, 'price' ] ) }
							style={ { color: priceColor } }
							className="pricing-table__price"
						/>
						<RichText.Content
							tagName="ul"
							value={ _get( columns, [ index, 'features' ] ) }
							style={ { color: featuresColor } }
							className="pricing-table__features"
						/>
						<div className="button-container">
							<RichText.Content
								tagName="a"
								href={ _get( columns, [ index, 'buttonURL' ] ) }
								style={ { backgroundColor: buttonBackgroundColor, color: buttonColor } }
								value={ _get( columns, [ index, 'buttonText' ], 'Click Here!' ) }
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
