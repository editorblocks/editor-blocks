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
	title: __( 'Features (EB)', 'editor-blocks' ),
	description: __( 'Display an organised feature list in columns. Accompany each feature with an image or icon.', 'editor-blocks' ),
	icon: 'editor-ul',
	category: 'editor-blocks',
	keywords: [
		__( 'Features', 'editor-blocks' ),
		__( 'Editor Blocks', 'editor-blocks' ),
		__( 'EB', 'editor-blocks' ),
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
			default: [],
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
		const { attributes, setAttributes, className } = props;
		const featureClasses = className + ' col-' + attributes.count;

		function onChangeFeature( value, i, attribute ) {
			const features = attributes.features;
			const newFeatures = features.slice();
			newFeatures[ i ] = Object.assign( {}, features[ i ] );
			newFeatures[ i ][ attribute ] = value;
			setAttributes( { features: [ ...newFeatures ] } );
		}

		function onChangeFeatureImage( value, i ) {
			const features = attributes.features;
			const newFeatures = features.slice();
			newFeatures[ i ] = Object.assign( {}, features[ i ] );
			newFeatures[ i ].image = value.url;
			setAttributes( { features: [ ...newFeatures ] } );
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
				<div style={ { textAlign: attributes.alignment } } className={ featureClasses }>
					{ _times( attributes.count, ( index ) => {
						const image = _get( attributes.features, [ index, 'image' ] );
						const featureClass = 'feature feature-' + index;
						return (
							<div className={ featureClass } key={ `feature-${ index }` }>
								<MediaUpload
									onSelect={ ( value ) => onChangeFeatureImage( value, index ) }
									type="image"
									value={ image }
									render={ ( { open } ) => (
										<Button onClick={ open }>
											{ ! image ?
												<div className="no-image"><Dashicon icon="format-image" /></div> :
												<img
													className="feature__image"
													src={ image }
													alt={ __( 'Feature', 'editor-blocks' ) }
												/>
											}
										</Button>
									) }
								>
								</MediaUpload>
								<RichText
									value={ _get( attributes.features, [ index, 'heading' ] ) }
									onChange={ ( value ) => onChangeFeature( value, index, 'heading' ) }
									tagName="h3"
									placeholder={ __( 'Feature Heading', 'editor-blocks' ) }
									keepPlaceholderOnFocus={ true }
									style={ { color: attributes.headingColor } }
									className="feature__heading"
								/>
								<RichText
									value={ _get( attributes.features, [ index, 'text' ] ) }
									onChange={ ( value ) => onChangeFeature( value, index, 'text' ) }
									tagName="p"
									placeholder={ __( 'Feature Description', 'editor-blocks' ) }
									keepPlaceholderOnFocus={ true }
									style={ { color: attributes.textColor } }
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
		const { attributes } = props;
		const featureClasses = 'col-' + attributes.count;

		return (
			<div className={ featureClasses } style={ { textAlign: attributes.alignment } }>
				{ _times( attributes.count, ( index ) => {
					const image = _get( attributes.features, [ index, 'image' ] );
					const featureClass = 'feature feature-' + index;
					return (
						<div className={ featureClass } key={ `feature-${ index }` }>
							{ image &&
								<img
									className="feature__image"
									src={ image }
									alt="Feature Image"
								/>
							}
							<RichText.Content
								tagName="h3"
								style={ { color: attributes.headingColor } }
								value={ _get( attributes.features, [ index, 'heading' ] ) }
								className="feature__heading"
							/>
							<RichText.Content
								tagName="p"
								style={ { color: attributes.textColor } }
								value={ _get( attributes.features, [ index, 'text' ] ) }
								className="feature__text"
							/>
						</div>
					);
				} ) }
			</div>
		);
	},
} );
