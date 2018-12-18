/**
 * BLOCK: Testimonial
 */

import './style.scss';
import './editor.scss';
import Inspector from './inspector';

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText, BlockControls, AlignmentToolbar, MediaUpload } = wp.editor;
const { Button, Dashicon } = wp.components;

registerBlockType( 'editor-blocks/testimonial', {
	title: __( 'Testimonial (EB)', 'editor-blocks' ),
	description: __( 'Showcase your client testimonials with this beautiful block.', 'editor-blocks' ),
	category: 'editor-blocks',
	icon: 'format-quote',
	keywords: [
		__( 'Testimonial', 'editor-blocks' ),
		__( 'Review', 'editor-blocks' ),
		__( 'Editor Blocks', 'editor-blocks' ),
	],
	attributes: {
		maxWidth: {
			type: 'number',
			default: 600,
		},
		testimonial: {
			source: 'children',
			selector: '.testimonial__text',
		},
		author: {
			source: 'children',
			selector: '.testimonial__author',
		},
		alignment: {
			type: 'string',
			default: 'center',
		},
		authorImage: {
			source: 'attribute',
			selector: '.testimonial__image',
			attribute: 'src',
		},
		authorImageSize: {
			type: 'number',
		},
		testimonialColor: {
			type: 'string',
		},
		testimonialSize: {
			type: 'number',
		},
		authorColor: {
			type: 'string',
		},
		authorSize: {
			type: 'number',
		},
	},

	edit: function( props ) {
		const { attributes, setAttributes, className } = props;

		return (
			<Fragment>
				<Inspector { ...props } />
				<BlockControls key="controls">
					<AlignmentToolbar
						value={ attributes.alignment }
						onChange={ ( alignment ) => setAttributes( { alignment } ) }
					/>
				</BlockControls>
				<div className={ attributes.className } style={ { textAlign: attributes.alignment } } >
					<div className="inner" style={ { maxWidth: attributes.maxWidth && attributes.maxWidth + 'px' } } >
						<MediaUpload
							onSelect={ ( value ) => setAttributes( { authorImage: value.url } ) }
							type="image"
							value={ attributes.authorImage }
							render={ ( { open } ) => (
								<Button onClick={ open }>
									{ ! attributes.authorImage ?
										<div className="no-image"><Dashicon icon="format-image" /></div> :
										<img
											className={ `${ className }-image` }
											src={ attributes.authorImage }
											alt={ __( 'Testimonial Author', 'editor-blocks' ) }
											style={ { maxWidth: attributes.authorImageSize && attributes.authorImageSize + 'px' } }
										/>
									}
								</Button>
							) }
						>
						</MediaUpload>
						<RichText
							value={ attributes.testimonial }
							onChange={ ( testimonial ) => setAttributes( { testimonial } ) }
							tagName="blockquote"
							placeholder={ __( 'Testimonial', 'editor-blocks' ) }
							keepPlaceholderOnFocus={ true }
							className="testimonial__text"
							style={ { color: attributes.testimonialColor, fontSize: attributes.testimonialSize && attributes.testimonialSize + 'px' } }
						/>
						<RichText
							value={ attributes.author }
							onChange={ ( author ) => setAttributes( { author } ) }
							tagName="span"
							placeholder={ __( 'Joe Blogs - Author', 'editor-blocks' ) }
							keepPlaceholderOnFocus={ true }
							className="testimonial__author"
							style={ { color: attributes.authorColor, fontSize: attributes.authorSize && attributes.authorSize + 'px' } }
						/>
					</div>
				</div>
			</Fragment>
		);
	},

	save: function( props ) {
		const { attributes } = props;

		return (
			<div style={ { textAlign: attributes.alignment } } >
				<div className="inner" style={ { maxWidth: attributes.maxWidth && attributes.maxWidth + 'px' } } >
					{ attributes.authorImage &&
						<img
							src={ attributes.authorImage }
							style={ { maxWidth: attributes.authorImageSize && attributes.authorImageSize + 'px' } }
							className="testimonial__image"
							alt="Testimonial Author Image"
						/>
					}
					<RichText.Content
						tagName="blockquote"
						style={ { color: attributes.testimonialColor, fontSize: attributes.testimonialSize && attributes.testimonialSize + 'px' } }
						value={ attributes.testimonial }
						className="testimonial__text"
					/>
					<RichText.Content
						tagName="span"
						style={ { color: attributes.authorColor, fontSize: attributes.authorSize && attributes.authorSize + 'px' } }
						value={ attributes.author }
						className="testimonial__author"
					/>
				</div>
			</div>
		);
	},
} );
