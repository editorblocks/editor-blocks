/**
 * BLOCK: Team
 */

import './style.scss';
import './editor.scss';
import Inspector from './inspector';
import _get from 'lodash/get';
import _times from 'lodash/times';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { MediaUpload, RichText } = wp.editor;
const { Button, Dashicon } = wp.components;

registerBlockType( 'editor-blocks/team', {
	title: __( 'Team (EB)' ),
	icon: 'groups',
	category: 'editor-blocks',
	keywords: [
		__( 'Features' ),
		__( 'Editor Blocks' ),
		__( 'EB' ),
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
			default: [ [], [] ]
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

			const { members, count, nameColor, positionColor, bioColor } = props.attributes;
			const { className, setAttributes } = props;

			function onChangeMember( value, i, attribute ) {
				const newMembers = members;
				if( newMembers[i] === undefined ) {
					newMembers[i] = {}
				}
				const member = newMembers[i];
				member[attribute] = value;
				setAttributes( { members: [ ...newMembers ] } );
			}

			function onChangeMemberImage( value, i ) {
				const newMembers = members;
				if( newMembers[i] === undefined ) {
					newMembers[i] = {}
				}
				const member = newMembers[i];
				member['image'] = value.url;
				setAttributes( { members: [ ...newMembers ] } );
			}

			const teamClasses = className  + ' col-' + count;

			return [
				<Inspector
					{ ...props }
				/>,
				<div className={ teamClasses }>
					{ _times( count, ( index ) => {
						const image = _get( members, [ index, 'image' ] )
						const memberClass = 'team-member team-member-' + index;
							return (
								<div className={ memberClass } key={ `member-${ index }` }>
									<MediaUpload
										onSelect={ ( value ) => onChangeMemberImage( value, index ) }
										type="image"
										value={ image }
										render={ ( { open } ) => (
											<Button onClick={ open }>
												{ ! image ? <div className="no-image"><Dashicon icon="format-image" /></div> :
													<img
														className={ `${ className }-image` }
														src={ image }
														alt="Team Member Image"
													/>
												}
											</Button>
										) }
									>
								</MediaUpload>
								<RichText
									value={ _get( members, [ index, 'name' ] ) }
									onChange={ ( value ) => onChangeMember( value, index, 'name' ) }
									tagName='h3'
									placeholder={ __( 'Name' ) }
									formattingControls={[]}
									keepPlaceholderOnFocus={ true }
									className="team-member__name"
									style={ { color: nameColor } }
								/>
								<RichText
									value={ _get( members, [ index, 'position' ] ) }
									onChange={ ( value ) => onChangeMember( value, index, 'position' ) }
									tagName='p'
									placeholder={ __( 'Position' ) }
									formattingControls={[]}
									keepPlaceholderOnFocus={ true }
									className="team-member__position"
									style={ { color: positionColor } }
								/>
								<RichText
									value={ _get( members, [ index, 'bio' ] ) }
									onChange={ ( value ) => onChangeMember( value, index, 'bio' ) }
									tagName='p'
									placeholder={ __( 'Bio' ) }
									keepPlaceholderOnFocus={ true }
									className="team-member__bio"
									style={ { color: bioColor } }
								/>
							</div>
							);
						} ) }
				</div>
			];

		},

	save: function( props ) {

		const { members, count, nameColor, positionColor, bioColor } = props.attributes;
		const teamClasses = 'col-' + count;

		return (
			<div className={ teamClasses }>
			{ _times( count, ( index ) => {
				const image = _get( members, [ index, 'image' ] );
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
							value={ _get( members, [ index, 'name' ] ) }
							style={ { color: nameColor } }
						/>
						<RichText.Content
							tagName="span"
							className="team-member__position"
							value={ _get( members, [ index, 'position' ] ) }
							style={ { color: positionColor } }
						/>
						<RichText.Content
							tagName="p"
							className="team-member__bio"
							value={ _get( members, [ index, 'bio' ] ) }
							style={ { color: bioColor } }
						/>
					</div>
				);

			} ) }
			</div>
		);

	},
} );
