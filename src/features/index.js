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

registerBlockType( 'editor-blocks/features', {
	title: __( 'Features (EB)' ),
	icon: 'editor-ul',
	category: 'editor-blocks',
	keywords: [
		__( 'Features' ),
		__( 'Editor Blocks' ),
		__( 'EB' ),
	],
	attributes: {
		features: {
			type: 'array',
			selector: '.feature',
			source: 'query',
			query: {
				image: { source: 'attribute', selector: '.feature__image', attribute: 'src' },
				heading: { source: 'children', selector: '.feature__heading' },
				text: { source: 'children', selector: '.feature__text' },
			},
			default: [ [], [] ],
		},
		count: {
			type: 'number',
			default: 3,
		},
		alignment: {
			type: 'string',
		},
		headingColor: {
			type: 'string',
		},
		textColor: {
			type: 'string',
		},
	},

	edit: function( props ) {

		const { features, count, alignment } = props.attributes;
		const { className, setAttributes } = props;
		const { headingColor, textColor } = props.attributes;
		const featureClasses = className  + ' col-' + count;

		function onChangeFeature( value, i, attribute ) {
			const newFeatures = features;
			if ( newFeatures[ i ] === undefined ) {
				newFeatures[ i ] = {};
			}
			const feature = newFeatures[ i ];
			feature[ attribute ] = value;
			setAttributes( { features: [ ...newFeatures ] } );
		}

		function onChangeFeatureImage( value, i ) {
			const newFeatures = features;
			if ( newFeatures[ i ] === undefined ) {
				newFeatures[ i ] = {};
			}
			const feature = newFeatures[ i ];
			feature.image = value.url;
			setAttributes( { features: [ ...newFeatures ] } );
		}

		return (
			<Fragment>
				<Inspector { ...props } />
				<BlockControls key="controls">
					<AlignmentToolbar
						value={ alignment }
						onChange={ ( alignment ) => setAttributes( { alignment } ) }
					/>
				</BlockControls>
				<div style={ { textAlign: alignment } } className={ featureClasses }>
					{ _times( count, ( index ) => {
						const image = _get( features, [ index, 'image' ] )
						const featureClass = 'feature feature-' + index;
						return (
							<div className={ featureClass } key={ `feature-${ index }` }>
								<MediaUpload
									onSelect={ ( value ) => onChangeFeatureImage( value, index ) }
									type="image"
									value={ image }
									render={ ( { open } ) => (
										<Button onClick={ open }>
											{ ! image ? <div className="no-image"><Dashicon icon="format-image" /></div> :
												<img
													class="feature__image"
													src={ image }
													alt="Feature Image"
												/>
											}
										</Button>
									) }
								>
								</MediaUpload>
								<RichText
									value={ _get( features, [ index, 'heading' ] ) }
									onChange={ ( value ) => onChangeFeature( value, index, 'heading' ) }
									tagName="h3"
									placeholder={ __( 'Feature Heading' ) }
									keepPlaceholderOnFocus={ true }
									style={ { color: headingColor } }
									className="feature__heading"
								/>
								<RichText
									value={ _get( features, [ index, 'text' ] ) }
									onChange={ ( value ) => onChangeFeature( value, index, 'text' ) }
									tagName="p"
									placeholder={ __( 'Feature Description' ) }
									keepPlaceholderOnFocus={ true }
									style={ { color: textColor } }
									className="feature__text"
								/>
							</div>
						);
					} ) }
				</div>
			</Fragment>
		);
	},

	save: function( props ) {

		const { features, count, alignment } = props.attributes;
		const { headingColor, textColor } = props.attributes;
		const featureClasses = 'col-' + count;

		return (
			<div className={ featureClasses } style={ { textAlign: alignment } }>
				{ _times( count, ( index ) => {
					const image = _get( features, [ index, 'image' ] );
					const featureClass = 'feature feature-' + index;
					return (
						<div className={ featureClass } key={ `feature-${ index }` }>
							{ image &&
								<img
									className='feature__image'
									src={ image }
									alt="Feature Image"
								/>
							}
							<RichText.Content
								tagName="h3"
								style={ { color: headingColor } }
								value={ _get( features, [ index, 'heading' ] ) }
								className="feature__heading"
							/>
							<RichText.Content
								tagName="p"
								style={ { color: textColor } }
								value={ _get( features, [ index, 'text' ] ) }
								className="feature__text"
							/>
						</div>
					);
				} ) }
			</div>
		);
	},
} );
