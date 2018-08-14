/**
 * BLOCK: Wrapper
 */

import './style.scss';
import './editor.scss';
import Inspector from './inspector';
import classnames from 'classnames';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;

const attributes = {
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
	}
}

registerBlockType( 'editor-blocks/wrapper', {
	title: __( 'Wrapper (EB)' ),
	icon: 'editor-contract',
	category: 'editor-blocks',
	keywords: [
		__( 'wrapper' ),
		__( 'Editor Blocks' ),
		__( 'EB' ),
	],
	attributes,

	getEditWrapperProps() {
		return { 'data-align': 'full' };
	},

	edit: function( props ) {

			const { maxWidth, align, fullWidthBackground, position, paddingTop, paddingLeft, paddingBottom, paddingRight } = props.attributes;
			const { marginTop, marginBottom } = props.attributes;
			const { backgroundColor, backgroundImage, backgroundOpacity } = props.attributes;
			const { className } = props;

			const wrapperStyle = {
				paddingTop: paddingTop !== 0 ? paddingTop + 'px' : null,
				paddingRight: paddingRight !== 0 ? paddingRight + 'px' : null,
				paddingBottom: paddingBottom !== 0 ? paddingBottom + 'px' : null,
				paddingLeft: paddingLeft !== 0 ? paddingLeft + 'px' : null,
				marginTop: marginTop !== 0 ? marginTop + 'px' : null,
				marginBottom: marginBottom !== 0 ? marginBottom + 'px' : null,
				backgroundColor: backgroundColor,
				backgroundImage: backgroundImage && 'url(' + backgroundImage + ')',
			};

			const classes = classnames(
				className,
				dimRatioToClass( backgroundOpacity ),
				{
					'has-background-dim': backgroundOpacity !== 0,
				},
				position,
				{ [`align${ align }`]: align && fullWidthBackground },
			);

			return [
				<Inspector { ...props } />,
				<div style={ wrapperStyle } className={ classes }>
					<div className='wrapper-inner'>
						<div className='wrapper-inner-blocks' style={ { maxWidth: maxWidth && maxWidth + 'px' } }>
							<InnerBlocks />
						</div>
					</div>
				</div>
			];
		},

	save: function( props ) {

		const { fullWidthBackground, maxWidth, position, align, paddingTop, paddingLeft, paddingBottom, paddingRight } = props.attributes;
		const { marginTop, marginBottom  } = props.attributes;
		const { backgroundColor, backgroundImage, backgroundOpacity } = props.attributes;
		const { className } = props;

		const wrapperStyle = {
			paddingTop: paddingTop !== 0 ? paddingTop + 'px' : null,
			paddingRight: paddingRight !== 0 ? paddingRight + 'px' : null,
			paddingBottom: paddingBottom !== 0 ? paddingBottom + 'px' : null,
			paddingLeft: paddingLeft !== 0 ? paddingLeft + 'px' : null,
			marginTop: marginTop !== 0 ? marginTop + 'px' : null,
			marginBottom: marginBottom !== 0 ? marginBottom + 'px' : null,
			backgroundColor: backgroundColor,
			backgroundImage: backgroundImage && 'url(' + backgroundImage + ')',
		};

		const classes = classnames(
			className,
			{ [`align${ align }`]: align && fullWidthBackground },
			dimRatioToClass( backgroundOpacity ),
			{
				'has-background-dim': backgroundOpacity !== 0,
			},
			position
		);

		return (
			<div style={ wrapperStyle } className={ classes }>
				<div className='wrapper-inner'>
					<div className='wrapper-inner-blocks' style={ { maxWidth: maxWidth && maxWidth + 'px' } }>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},

	deprecated: [
		{
				attributes,

				save: function( props ) {

					const { fullWidthBackground, maxWidth, position, align, paddingTop, paddingLeft, paddingBottom, paddingRight } = props.attributes;
					const { marginTop, marginBottom  } = props.attributes;
					const { backgroundColor, backgroundImage, backgroundOpacity } = props.attributes;
					const { className } = props;

					const wrapperStyle = {
						paddingTop: paddingTop !== 0 ? paddingTop + 'px' : null,
						paddingRight: paddingRight !== 0 ? paddingRight + 'px' : null,
						paddingBottom: paddingBottom !== 0 ? paddingBottom + 'px' : null,
						paddingLeft: paddingLeft !== 0 ? paddingLeft + 'px' : null,
						marginTop: marginTop !== 0 ? marginTop + 'px' : null,
						marginBottom: marginBottom !== 0 ? marginBottom + 'px' : null,
						backgroundColor: backgroundColor,
						backgroundImage: backgroundImage && 'url(' + backgroundImage + ')',
					};

					const classes = classnames(
						className,
						{ [`align${ align }`]: align && fullWidthBackground },
						dimRatioToClass( backgroundOpacity ),
						{
							'has-background-dim': backgroundOpacity !== 0,
						},
						position
					);

					return (
						<div style={ wrapperStyle } className={ classes }>
							<div className='wrapper-inner' style={ { maxWidth: maxWidth && maxWidth + 'px' } }>
								<InnerBlocks.Content />
							</div>
						</div>
					);
				},
		}
]
} );

function dimRatioToClass( ratio ) {
	return ( ratio === 0 ) ?
		null :
		'has-background-dim-' + ( 10 * Math.round( ratio / 10 ) );
}
