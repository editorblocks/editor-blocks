/**
 * External dependencies
 */

const { Component, Fragment } = wp.element;

const { __ } = wp.i18n;

const { SelectControl, PanelBody } = wp.components;
const { InspectorControls } = wp.editor;
const { withSelect } = wp.data;

class AuthorProfileBlock extends Component {

	getAuthorsForSelect() {
		const { authors } = this.props;
		return authors.map( ( author ) => {
			return {
				label: author.name,
				value: author.id,
			};
		} );
	}

	render() {
		const { attributes, setAttributes, authors } = this.props;

		const { authorID } = attributes;
		const obj = this.getAuthorsForSelect();
		obj.push( { label: '- Select User -', value: 0 } );

		obj.sort( function( a, b ) {
			return a.value - b.value;
		} );

		const inspectorControls = (
			<InspectorControls>
				<PanelBody title={ __( 'Author Profile Settings', 'editor-blocks' ) }>
					<SelectControl
						label={ __( 'Author ID', 'editor-blocks' ) }
						type="number"
						value={ authorID }
						options={ obj }
						onChange={ ( value ) => setAttributes( { authorID: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
		);

		function isAuthor( author ) {
			return parseInt( author.id ) === parseInt( authorID );
		}

		const newAuthor = authors.find( isAuthor );

		return (
			<Fragment>
				{ inspectorControls }

				{ parseInt( authorID ) === 0 ?
					( <SelectControl
						label={ __( 'Author ID', 'editor-blocks' ) }
						type="number"
						value={ authorID }
						options={ obj }
						onChange={ ( value ) => setAttributes( { authorID: value } ) }
					/> ) : (
						<div className="author-profile">
							<div className="author-profile__image"><img alt={ newAuthor && newAuthor.name } src={ newAuthor && newAuthor.avatar_urls[ 96 ] } /></div>
							<div className="author-profile__content">
								<h3 className="author-profile__name">{ ( newAuthor && newAuthor.name ) || 'Select a user.' }</h3>
								<p className="author-profile__description">{ newAuthor && newAuthor.description }</p>
							</div>
						</div>
					)
				}
			</Fragment>
		);
	}

}

export default withSelect( ( select ) => {
	return {
		authors: select( 'core' ).getAuthors(),
	};
} )( AuthorProfileBlock );
