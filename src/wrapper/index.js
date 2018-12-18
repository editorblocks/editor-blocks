/**
 * BLOCK: Wrapper
 */

import './style.scss';
import './editor.scss';
import Inspector from './inspector';
import classnames from 'classnames';

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;

const blockAttributes = {
	align: {
		type: 'string',
		default: 'full',
	},
	position: {
		type: 'string',
	},
	fullWidthBackground: {
		type: 'bool',
		default: true,
	},
	maxWidth: {
		type: 'number',
	},
	paddingTop: {
		type: 'number',
		default: 50,
	},
	paddingRight: {
		type: 'number',
		default: 0,
	},
	paddingBottom: {
		type: 'number',
		default: 50,
	},
	paddingLeft: {
		type: 'number',
		default: 0,
	},
	marginTop: {
		type: 'number',
		default: 50,
	},
	marginRight: {
		type: 'number',
	},
	marginBottom: {
		type: 'number',
		default: 50,
	},
	marginLeft: {
		type: 'number',
	},
	backgroundColor: {
		type: 'string',
	},
	backgroundImage: {
		type: 'string',
	},
	backgroundOpacity: {
		type: 'number',
		default: 0,
	},
};

registerBlockType( 'editor-blocks/wrapper', {
	title: __( 'Wrapper (EB)', 'editor-blocks' ),
	description: __( 'Add a background image or color to any block, as well as padding and margins.', 'editor-blocks' ),
	icon: 'editor-contract',
	category: 'editor-blocks',
	keywords: [
		__( 'wrapper', 'editor-blocks' ),
		__( 'Editor Blocks', 'editor-blocks' ),
		__( 'EB', 'editor-blocks' ),
	],
	attributes: blockAttributes,

	getEditWrapperProps() {
		return { 'data-align': 'full' };
	},

	edit: function( props ) {
		const { attributes, className } = props;

		const wrapperStyle = {
			paddingTop: attributes.paddingTop !== 0 ? attributes.paddingTop + 'px' : null,
			paddingRight: attributes.paddingRight !== 0 ? attributes.paddingRight + 'px' : null,
			paddingBottom: attributes.paddingBottom !== 0 ? attributes.paddingBottom + 'px' : null,
			paddingLeft: attributes.paddingLeft !== 0 ? attributes.paddingLeft + 'px' : null,
			marginTop: attributes.marginTop !== 0 ? attributes.marginTop + 'px' : null,
			marginBottom: attributes.marginBottom !== 0 ? attributes.marginBottom + 'px' : null,
			backgroundColor: attributes.backgroundColor,
			backgroundImage: attributes.backgroundImage && 'url(' + attributes.backgroundImage + ')',
		};

		const classes = classnames(
			className,
			dimRatioToClass( attributes.backgroundOpacity ),
			{
				'has-background-dim': attributes.backgroundOpacity !== 0,
			},
			attributes.position,
			{ [ `align${ attributes.align }` ]: attributes.align && attributes.fullWidthBackground },
		);

		return (
			<Fragment>
				<Inspector { ...props } />
				<div style={ wrapperStyle } className={ classes }>
					<div className="wrapper-inner">
						<div className="wrapper-inner-blocks" style={ { maxWidth: attributes.maxWidth && attributes.maxWidth + 'px' } }>
							<InnerBlocks />
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	save: function( props ) {
		const { attributes, className } = props;

		const wrapperStyle = {
			paddingTop: attributes.paddingTop !== 0 ? attributes.paddingTop + 'px' : null,
			paddingRight: attributes.paddingRight !== 0 ? attributes.paddingRight + 'px' : null,
			paddingBottom: attributes.paddingBottom !== 0 ? attributes.paddingBottom + 'px' : null,
			paddingLeft: attributes.paddingLeft !== 0 ? attributes.paddingLeft + 'px' : null,
			marginTop: attributes.marginTop !== 0 ? attributes.marginTop + 'px' : null,
			marginBottom: attributes.marginBottom !== 0 ? attributes.marginBottom + 'px' : null,
			backgroundColor: attributes.backgroundColor,
			backgroundImage: attributes.backgroundImage && 'url(' + attributes.backgroundImage + ')',
		};

		const classes = classnames(
			className,
			{ [ `align${ attributes.align }` ]: attributes.align && attributes.fullWidthBackground },
			dimRatioToClass( attributes.backgroundOpacity ),
			{
				'has-background-dim': attributes.backgroundOpacity !== 0,
			},
			attributes.position
		);

		return (
			<div style={ wrapperStyle } className={ classes }>
				<div className="wrapper-inner">
					<div className="wrapper-inner-blocks" style={ { maxWidth: attributes.maxWidth && attributes.maxWidth + 'px' } }>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},

	deprecated: [
		{
			attributes: blockAttributes,

			save: function( props ) {
				const { attributes, className } = props;

				const wrapperStyle = {
					paddingTop: attributes.paddingTop !== 0 ? attributes.paddingTop + 'px' : null,
					paddingRight: attributes.paddingRight !== 0 ? attributes.paddingRight + 'px' : null,
					paddingBottom: attributes.paddingBottom !== 0 ? attributes.paddingBottom + 'px' : null,
					paddingLeft: attributes.paddingLeft !== 0 ? attributes.paddingLeft + 'px' : null,
					marginTop: attributes.marginTop !== 0 ? attributes.marginTop + 'px' : null,
					marginBottom: attributes.marginBottom !== 0 ? attributes.marginBottom + 'px' : null,
					backgroundColor: attributes.backgroundColor,
					backgroundImage: attributes.backgroundImage && 'url(' + attributes.backgroundImage + ')',
				};

				const classes = classnames(
					className,
					{ [ `align${ attributes.align }` ]: attributes.align && attributes.fullWidthBackground },
					dimRatioToClass( attributes.backgroundOpacity ),
					{
						'has-background-dim': attributes.backgroundOpacity !== 0,
					},
					attributes.position
				);

				return (
					<div style={ wrapperStyle } className={ classes }>
						<div className="wrapper-inner" style={ { maxWidth: attributes.maxWidth && attributes.maxWidth + 'px' } }>
							<InnerBlocks.Content />
						</div>
					</div>
				);
			},

		},

	],
} );

function dimRatioToClass( ratio ) {
	return ( ratio === 0 ) ?
		null :
		'has-background-dim-' + ( 10 * Math.round( ratio / 10 ) );
}
