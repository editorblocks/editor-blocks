/**
 * BLOCK: Testimonial
 */

import './style.scss';
import './editor.scss';
import Inspector from './inspector';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, BlockControls, AlignmentToolbar, MediaUpload } = wp.editor;
const { Button, Dashicon } = wp.components;

registerBlockType( 'editor-blocks/testimonial', {
	title: __( 'Testimonial (EB)' ),
	category: 'editor-blocks',
	icon: 'format-quote',
	keywords: [
		__( 'Testimonial' ),
		__( 'Review' ),
		__( 'Editor Blocks' ),
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

		const { maxWidth, authorImage, testimonial, author, alignment } = props.attributes;
		const { className, setAttributes } = props;
		const { authorImageSize, testimonialColor, testimonialSize, authorColor, authorSize } = props.attributes;

		return [
			<Inspector { ...props } />,
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ alignment }
					onChange={ ( alignment ) => setAttributes( { alignment } ) }
				/>
			</BlockControls>,
			<div className={ className } style={ { textAlign: alignment } } >
				<div className="inner" style={ { maxWidth: maxWidth && maxWidth + 'px' } } >
					<MediaUpload
						onSelect={ ( value ) => setAttributes( { authorImage: value.url } ) }
						type="image"
						value={ authorImage }
						render={ ( { open } ) => (
							<Button onClick={ open }>
								{ ! authorImage ? <div className="no-image"><Dashicon icon="format-image" /></div> :
									<img
										className={ `${ className }-image` }
										src={ authorImage }
										alt="Testimonial Author Image"
										className="testimonial__image"
										style={ { maxWidth: authorImageSize && authorImageSize + 'px' } }
									/>
								}
							</Button>
						) }
					>
					</MediaUpload>
					<RichText
						value={ testimonial }
						onChange={ ( testimonial ) => setAttributes( { testimonial } ) }
						tagName="blockquote"
						placeholder={ __( 'Testimonial' ) }
						keepPlaceholderOnFocus={ true }
						className="testimonial__text"
						style={ { color: testimonialColor, fontSize: testimonialSize && testimonialSize + 'px' } }
					/>
					<RichText
						value={ author }
						onChange={ ( author ) => setAttributes( { author } ) }
						tagName="span"
						placeholder={ __( 'Joe Blogs - Author' ) }
						keepPlaceholderOnFocus={ true }
						className="testimonial__author"
						style={ { color: authorColor, fontSize: authorSize && authorSize + 'px' } }
					/>
				</div>
			</div>
		];
	},

	save: function( props ) {

		const { maxWidth, testimonial, author, alignment } = props.attributes;
		const { testimonialColor, testimonialSize, authorImageSize, authorColor, authorSize, authorImage } = props.attributes;
		const { className } = props;

		return (
			<div style={ { textAlign: alignment } } >
				<div className="inner" style={ { maxWidth: maxWidth && maxWidth + 'px' } } >
					{ authorImage &&
						<img
							className='editor-blocks-testimonial-author-image'
							src={ authorImage }
							alt="Testimonial Author Image"
							style={ { maxWidth: authorImageSize && authorImageSize + 'px' } }
							className="testimonial__image"
						/>
					}
					<RichText.Content
						tagName="blockquote"
						style={ { color: testimonialColor, fontSize: testimonialSize && testimonialSize + 'px' } }
						value={ testimonial }
						className="testimonial__text"
					/>
					<RichText.Content
						tagName="span"
						style={ { color: authorColor, fontSize: authorSize && authorSize + 'px' } }
						value={ author }
						className="testimonial__author"
					/>
				</div>
			</div>
		);

	},
} );
