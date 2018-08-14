/**
 * BLOCK: Intro
 */

import './style.scss';
import './editor.scss';
import Inspector from './inspector';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, BlockControls, AlignmentToolbar } = wp.editor;

registerBlockType( 'editor-blocks/intro', {
	title: __( 'Intro (EB)' ),
	category: 'editor-blocks',
	icon: 'editor-textcolor',
	keywords: [
		__( 'Intro' ),
		__( 'Heading' ),
		__( 'Subheading' ),
	],
	attributes: {
		maxWidth: {
			type: 'number',
			default: 600,
		},
		heading: {
			source: 'children',
			selector: '.intro__heading'
		},
		subheading: {
			source: 'children',
			selector: '.intro__subheading'
		},
		alignment: {
			type: 'string',
		},
		headingColor: {
			type: 'string',
		},
		headingSize: {
			type: 'number',
		},
		subheadingColor: {
			type: 'string',
		},
		subheadingSize: {
			type: 'number',
		},
	},

	edit: function( props ) {

			const { maxWidth, heading, subheading, alignment } = props.attributes;
			const { className, setAttributes } = props;
			const { headingColor, headingSize, subheadingColor, subheadingSize } = props.attributes;

			return [
				<Inspector { ...props } />,
				<BlockControls key="controls">
					<AlignmentToolbar
						value={ alignment }
						onChange={ ( alignment ) => setAttributes( { alignment } ) }
					/>
				</BlockControls>,
					<div className={ className } style={ { textAlign: alignment } } >
						<div class="inner" style={ { maxWidth: maxWidth + 'px' } } >
							<RichText
								value={ heading }
								onChange={ ( heading ) => setAttributes( { heading } ) }
								tagName='h2'
								placeholder={ __( 'Intro Heading' ) }
								keepPlaceholderOnFocus={ true }
								style={ { color: headingColor, fontSize: headingSize && headingSize + 'px' } }
								className="intro__heading"
							/>
							<RichText
								value={ subheading }
								onChange={ ( subheading ) => setAttributes( { subheading } ) }
								tagName='p'
								placeholder={ __( 'Subheading' ) }
								keepPlaceholderOnFocus={ true }
								style={ { color: subheadingColor, fontSize: subheadingSize && subheadingSize + 'px' } }
								className="intro__subheading"
							/>
						</div>
					</div>
			];

		},

	save: function( props ) {

		const { maxWidth, heading, subheading, alignment } = props.attributes;
		const { headingColor, headingSize, subheadingColor, subheadingSize } = props.attributes;

		return (
				<div style={ { textAlign: alignment } } >
					<div class="inner" style={ { maxWidth: maxWidth + 'px' } } >
						<RichText.Content
							tagName="h2"
							style={ { color: headingColor, fontSize: headingSize && headingSize + 'px' } }
							value={ heading }
							className="intro__heading"
						/>
						<RichText.Content
							tagName="p"
							style={ { color: subheadingColor, fontSize: subheadingSize && subheadingSize + 'px' } }
							value={ subheading }
							className="intro__subheading"
						/>
					</div>
				</div>
		);

	},
} );
