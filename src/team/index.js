/**
 * BLOCK: Team
 */

import './style.scss';
import './editor.scss';
import Inspector from './inspector';
import _get from 'lodash/get';
import _times from 'lodash/times';

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { MediaUpload, RichText } = wp.editor;
const { Button, Dashicon } = wp.components;

registerBlockType( 'editor-blocks/team', {
	title: __( 'Team (EB)', 'editor-blocks' ),
	description: __( 'Display a list of team members in a multi-column layout.', 'editor-blocks' ),
	icon: 'groups',
	category: 'editor-blocks',
	keywords: [
		__( 'Features', 'editor-blocks' ),
		__( 'Editor Blocks', 'editor-blocks' ),
		__( 'EB', 'editor-blocks' ),
	],
	attributes: {
		members: {
			type: 'array',
			selector: '.team-member',
			source: 'query',
			query: {
				image: { source: 'attribute', selector: '.team-member__image', attribute: 'src' },
				name: { source: 'children', selector: '.team-member__name' },
				position: { source: 'children', selector: '.team-member__position' },
				bio: { source: 'children', selector: '.team-member__bio' },
			},
			default: [],
		},
		count: {
			type: 'number',
			default: 4,
		},
		nameColor: {
			type: 'string',
		},
		positionColor: {
			type: 'string',
		},
		bioColor: {
			type: 'string',
		},
	},

	edit: function( props ) {
		const { attributes, className, setAttributes } = props;

		function onChangeMember( value, i, attribute ) {
			const members = attributes.members;
			const newMembers = members.slice();
			newMembers[ i ] = Object.assign( {}, members[ i ] );
			newMembers[ i ][ attribute ] = value;
			console.log( newMembers );
			setAttributes( { members: [ ...newMembers ] } );
		}

		function onChangeMemberImage( value, i ) {
			const members = attributes.members;
			const newMembers = members;
			newMembers[ i ] = Object.assign( {}, members[ i ] );
			newMembers[ i ].image = value.url;
			console.log( newMembers );
			setAttributes( { members: [ ...newMembers ] } );
		}

		const teamClasses = className + ' col-' + attributes.count;

		return (
			<Fragment>
				<Inspector { ...props } />
				<div className={ teamClasses }>
					{ _times( attributes.count, ( index ) => {
						const image = _get( attributes.members, [ index, 'image' ] );
						const memberClass = 'team-member team-member-' + index;
						return (
							<div className={ memberClass } key={ `member-${ index }` }>
								<MediaUpload
									onSelect={ ( value ) => onChangeMemberImage( value, index ) }
									type="image"
									value={ image }
									render={ ( { open } ) => (
										<Button onClick={ open }>
											{ ! image ?
												<div className="no-image"><Dashicon icon="format-image" /></div> :
												<img
													className={ `${ className }-image` }
													src={ image }
													alt="Team Member"
												/>
											}
										</Button>
									) }
								>
								</MediaUpload>
								<RichText
									value={ _get( attributes.members, [ index, 'name' ] ) }
									onChange={ ( value ) => onChangeMember( value, index, 'name' ) }
									tagName="h3"
									placeholder={ __( 'Name', 'editor-blocks' ) }
									formattingControls={ [] }
									keepPlaceholderOnFocus={ true }
									className="team-member__name"
									style={ { color: attributes.nameColor } }
								/>
								<RichText
									value={ _get( attributes.members, [ index, 'position' ] ) }
									onChange={ ( value ) => onChangeMember( value, index, 'position' ) }
									tagName="p"
									placeholder={ __( 'Position', 'editor-blocks' ) }
									formattingControls={ [] }
									keepPlaceholderOnFocus={ true }
									className="team-member__position"
									style={ { color: attributes.positionColor } }
								/>
								<RichText
									value={ _get( attributes.members, [ index, 'bio' ] ) }
									onChange={ ( value ) => onChangeMember( value, index, 'bio' ) }
									tagName="p"
									placeholder={ __( 'Bio', 'editor-blocks' ) }
									keepPlaceholderOnFocus={ true }
									className="team-member__bio"
									style={ { color: attributes.bioColor } }
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

		const teamClasses = 'col-' + attributes.count;

		return (
			<div className={ teamClasses }>
				{ _times( attributes.count, ( index ) => {
					const image = _get( attributes.members, [ index, 'image' ] );
					const memberClass = 'team-member team-member-' + index;
					return (
						<div className={ memberClass } key={ `member-${ index }` }>
							{ image &&
								<img
									src={ image }
									className="team-member__image"
									alt="Team Member Image"
								/>
							}
							<RichText.Content
								tagName="h3"
								className="team-member__name"
								value={ _get( attributes.members, [ index, 'name' ] ) }
								style={ { color: attributes.nameColor } }
							/>
							<RichText.Content
								tagName="span"
								className="team-member__position"
								value={ _get( attributes.members, [ index, 'position' ] ) }
								style={ { color: attributes.positionColor } }
							/>
							<RichText.Content
								tagName="p"
								className="team-member__bio"
								value={ _get( attributes.members, [ index, 'bio' ] ) }
								style={ { color: attributes.bioColor } }
							/>
						</div>
					);
				} ) }
			</div>
		);
	},
} );
