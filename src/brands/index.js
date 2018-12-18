/**
 * BLOCK: Brands
 */

import './style.scss';
import './editor.scss';
import Inspector from './inspector';
import _get from 'lodash/get';
import _times from 'lodash/times';

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { MediaUpload } = wp.editor;
const { Button, Dashicon } = wp.components;

registerBlockType( 'editor-blocks/brands', {
	title: __( 'Brands (EB)', 'editor-blocks' ),
	description: __( 'Display a collection of logos in a row. Perfect for highlighting your partners or clients.', 'editor-blocks' ),
	icon: 'awards',
	category: 'editor-blocks',
	keywords: [
		__( 'Brands', 'editor-blocks' ),
		__( 'Editor Blocks', 'editor-blocks' ),
		__( 'Logos', 'editor-blocks' ),
	],
	attributes: {
		brands: {
			type: 'array',
			selector: '.brand',
			source: 'query',
			query: {
				image: { source: 'attribute', attribute: 'src', selector: '.brand__image' },
			},
			default: [],
		},
		count: {
			type: 'number',
			default: 4,
		},
	},

	edit: function( props ) {
		const { attributes, setAttributes, className } = props;
		const brandClasses = className + ' col-' + attributes.count;

		function onChangeBrandImage( value, i ) {
			const brands = attributes.brands;
			const newBrands = brands.slice();
			newBrands[ i ] = Object.assign( {}, brands[ i ] );
			newBrands[ i ].image = value.url;
			setAttributes( { brands: [ ...newBrands ] } );
		}

		return (
			<Fragment>
				<Inspector { ...props } />
				<div className={ brandClasses }>
					{ _times( attributes.count, ( index ) => {
						const image = _get( attributes.brands, [ index, 'image' ] );
						const brandClass = 'brand brand-' + index;
						return (
							<div className={ brandClass } key={ `brand-${ index }` }>
								<MediaUpload
									onSelect={ ( value ) => onChangeBrandImage( value, index ) }
									type="image"
									value={ image }
									render={ ( { open } ) => (
										<Button onClick={ open }>
											{ ! image ?
												<div className="no-image"><Dashicon icon="format-image" /></div> :
												<img
													className="brand__image"
													src={ image }
													alt="Brand"
												/>
											}
										</Button>
									) }
								>
								</MediaUpload>
							</div>
						);
					} ) }
				</div>
			</Fragment>
		);
	},

	save: function( props ) {
		const { attributes } = props;
		const brandClasses = 'col-' + attributes.count;

		return (
			<div className={ brandClasses }>
				{ _times( attributes.count, ( index ) => {
					const image = _get( attributes.brands, [ index, 'image' ] );
					const brandClass = 'brand brand-' + index;
					return (
						<div className={ brandClass } key={ `brand-${ index }` }>
							{ image &&
								<img
									className="brand__image"
									src={ image }
									alt="Brand Image"
								/>
							}
						</div>
					);
				} ) }
			</div>
		);
	},
} );
