/**
 * BLOCK: Brands
 */

import './style.scss';
import './editor.scss';
import Inspector from './inspector';
import _get from 'lodash/get';
import _times from 'lodash/times';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { MediaUpload } = wp.editor;
const { Button, Dashicon } = wp.components;

registerBlockType( 'editor-blocks/brands', {
	title: __( 'Brands (EB)' ),
	icon: 'awards',
	category: 'editor-blocks',
	keywords: [
		__( 'Brands' ),
		__( 'Editor Blocks' ),
		__( 'EB' ),
	],
	attributes: {
		brands: {
			type: 'array',
			selector: '.brand',
			source: 'query',
			query: {
				image: { source: 'attribute', selector: '.brand__image', attribute: 'src' },
			},
			default: [ [], [] ]
		},
		count: {
			type: 'number',
			default: 4,
		},
	},

	edit: function( props ) {

			const { brands, count } = props.attributes;
			const { className, setAttributes } = props;
			const brandClasses = className  + ' col-' + count;

			function onChangeBrandImage( value, i ) {
				const newBrands = brands;
				if( newBrands[i] === undefined ) {
					newBrands[i] = {}
				}
				const brand = newBrands[i];
				brand['image'] = value.url;
				setAttributes( { brands: [ ...newBrands ] } );
			}

			return [
				<Inspector
					{ ...props }
				/>,
				<div className={ brandClasses }>
					{ _times( count, ( index ) => {
						const image = _get( brands, [ index, 'image' ] )
						const brandClass = 'brand brand-' + index;
							return (
								<div className={ brandClass } key={ `brand-${ index }` }>
									<MediaUpload
										onSelect={ ( value ) => onChangeBrandImage( value, index ) }
										type="image"
										value={ image }
										render={ ( { open } ) => (
											<Button onClick={ open }>
												{ ! image ? <div className="no-image"><Dashicon icon="format-image" /></div> :
													<img
														className="brand__image"
														src={ image }
														alt="Brand Image"
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
			];

		},

	save: function( props ) {

		const { brands, count } = props.attributes;
		const brandClasses = 'col-' + count;

		return (
			<div className={ brandClasses }>
				{ _times( count, ( index ) => {
					const image = _get( brands, [ index, 'image' ] );
					const brandClass = 'brand brand-' + index;
					return (
						<div className={ brandClass } key={ `brand-${ index }` }>
							{ image &&
									<img
										className='brand__image'
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
