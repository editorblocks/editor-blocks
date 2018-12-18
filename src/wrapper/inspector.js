/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls, PanelColorSettings, MediaUpload } = wp.editor;
const { PanelBody, RangeControl, SelectControl, ToggleControl, Button, Spinner } = wp.components;

/**
 * Inspector controls
 */
export default class Inspector extends Component {

	render() {
		const { attributes, setAttributes } = this.props;

		return (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Inner Width', 'editor-blocks' ) } >
					<RangeControl
						value={ attributes.maxWidth }
						label={ __( 'Inner Width (px)', 'editor-blocks' ) }
						onChange={ ( maxWidth ) => setAttributes( { maxWidth } ) }
						min={ 0 }
						max={ 1040 }
						step={ 10 }
						allowReset={ true }
					/>
					{ attributes.maxWidth &&
						<SelectControl
							label={ __( 'Position', 'editor-blocks' ) }
							value={ attributes.position }
							onChange={ ( position ) => setAttributes( { position } ) }
							options={ [
								{ value: '', label: __( 'Middle', 'editor-blocks' ) },
								{ value: 'left', label: __( 'Left', 'editor-blocks' ) },
								{ value: 'right', label: __( 'Right', 'editor-blocks' ) },
							] }
						/> }
					<ToggleControl
						label={ __( 'Full Width Background', 'editor-blocks' ) }
						checked={ attributes.fullWidthBackground }
						onChange={ () => setAttributes( { fullWidthBackground: ! attributes.fullWidthBackground } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Background Image', 'editor-blocks' ) } >
					{ !! attributes.backgroundImage &&
						<MediaUpload
							title={ __( 'Set featured image', 'editor-blocks' ) }
							onSelect={ ( value ) => setAttributes( { backgroundImage: value.url } ) }
							type="image"
							modalClass="editor-post-featured-image__media-modal"
							render={ ( { open } ) => (
								<Button className="editor-post-featured-image__preview" onClick={ open }>
									{ attributes.backgroundImage &&
										<img src={ attributes.backgroundImage } alt={ __( 'Featured image', 'editor-blocks' ) } />
									}
									{ ! attributes.backgroundImage && <Spinner /> }
								</Button>
							) }
						/>
					}
					{ ! attributes.backgroundImage &&
						<MediaUpload
							onSelect={ ( value ) => setAttributes( { backgroundImage: value.url } ) }
							type="image"
							value={ attributes.backgroundImage }
							render={ ( { open } ) => (
								<Button className="button" onClick={ open }>
									{ __( 'Open Media Library', 'editor-blocks' ) }
								</Button>
							) }
						/>
					}
					{ !! attributes.backgroundImage &&
						<Button onClick={ () => setAttributes( { backgroundImage: undefined } ) } isLink isDestructive>
							{ __( 'Remove Image', 'editor-blocks' ) }
						</Button>
					}
				</PanelBody>
				<PanelBody title={ __( 'Background Opacity', 'editor-blocks' ) } >
					<RangeControl
						value={ attributes.backgroundOpacity }
						label={ __( 'Background Opacity (%)', 'editor-blocks' ) }
						onChange={ ( backgroundOpacity ) => setAttributes( { backgroundOpacity } ) }
						min={ 0 }
						max={ 100 }
						step={ 10 }
					/>
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Color Settings' ) }
					colorSettings={ [
						{
							value: attributes.backgroundColor,
							onChange: ( backgroundColor ) => setAttributes( { backgroundColor } ),
							label: __( 'Background Color', 'editor-blocks' ),
						},
					] }
				>
				</PanelColorSettings>
				<PanelBody initialOpen={ true } title={ __( 'Padding', 'editor-blocks' ) }>
					<RangeControl
						value={ attributes.paddingTop }
						label={ __( 'Padding Top', 'editor-blocks' ) }
						onChange={ ( paddingTop ) => setAttributes( { paddingTop } ) }
						min={ 0 }
						max={ 250 }
					/>
					<RangeControl
						value={ attributes.paddingRight }
						label={ __( 'Padding Right', 'editor-blocks' ) }
						onChange={ ( paddingRight ) => setAttributes( { paddingRight } ) }
						min={ 0 }
						max={ 250 }
					/>
					<RangeControl
						value={ attributes.paddingBottom }
						label={ __( 'Padding Bottom', 'editor-blocks' ) }
						onChange={ ( paddingBottom ) => setAttributes( { paddingBottom } ) }
						min={ 0 }
						max={ 250 }
					/>
					<RangeControl
						value={ attributes.paddingLeft }
						label={ __( 'Padding Left', 'editor-blocks' ) }
						onChange={ ( paddingLeft ) => setAttributes( { paddingLeft } ) }
						min={ 0 }
						max={ 250 }
					/>
				</PanelBody>
				<PanelBody initialOpen={ true } title={ __( 'Margin', 'editor-blocks' ) }>
					<RangeControl
						value={ attributes.marginTop }
						label={ __( 'Margin Top', 'editor-blocks' ) }
						onChange={ ( marginTop ) => setAttributes( { marginTop } ) }
						min={ 0 }
						max={ 250 }
					/>
					<RangeControl
						value={ attributes.marginBottom }
						label={ __( 'Margin Bottom', 'editor-blocks' ) }
						onChange={ ( marginBottom ) => setAttributes( { marginBottom } ) }
						min={ 0 }
						max={ 250 }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}

}
