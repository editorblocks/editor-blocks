/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls, ColorPalette, MediaUpload } = wp.editor;
const { PanelBody, PanelColor, RangeControl, SelectControl, ToggleControl, Button, Spinner } = wp.components;

/**
 * Inspector controls
 */
export default class Inspector extends Component {

	render() {

		const { attributes, setAttributes, setBackgroundColor } = this.props;

		return (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Inner Width' ) } >
					<RangeControl
						value={ attributes.maxWidth }
						label={ __( 'Inner Width (px)' ) }
						onChange={ ( maxWidth ) => setAttributes( { maxWidth } ) }
						min={ 0 }
						max={ 1040 }
						step={ 10 }
						allowReset={ true }
					/>
					{ attributes.maxWidth &&
						<SelectControl
							label={ __( 'Position' ) }
							value={ attributes.position }
							onChange={ ( position ) => setAttributes( { position } ) }
							options={ [
								{ value: '', label: 'Middle' },
								{ value: 'left', label: 'Left' },
								{ value: 'right', label: 'Right' },
							] }
						/> }
					<ToggleControl
						label={ __( 'Full Width Background' ) }
						checked={ attributes.fullWidthBackground }
						onChange={ () => setAttributes( { fullWidthBackground: ! attributes.fullWidthBackground } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Background Image' ) } >
					{ !! attributes.backgroundImage &&
						<MediaUpload
							title={ __( 'Set featured image' ) }
							onSelect={ ( value ) => setAttributes( { backgroundImage: value.url } ) }
							type="image"
							modalClass="editor-post-featured-image__media-modal"
							render={ ( { open } ) => (
								<Button className="editor-post-featured-image__preview" onClick={ open }>
									{ attributes.backgroundImage &&
										<img src={ attributes.backgroundImage } alt={ __( 'Featured image' ) } />
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
									Open Media Library
								</Button>
							) }
						/>
					}
					{ !! attributes.backgroundImage &&
						<Button onClick={ () => setAttributes( { backgroundImage: undefined } ) } isLink isDestructive>
							Remove Image
						</Button>
					}
				</PanelBody>
				<PanelBody title={ __( 'Background Opacity' ) } >
					<RangeControl
						value={ attributes.backgroundOpacity }
						label={ __( 'Background Opacity (%)' ) }
						onChange={ ( backgroundOpacity ) => setAttributes( { backgroundOpacity } ) }
						min={ 0 }
						max={ 100 }
						step={ 10 }
					/>
				</PanelBody>
				<PanelColor
					colorValue={ attributes.backgroundColor }
					initialOpen={ true }
					title={ __( 'Background Color' ) }
					onChange={ setBackgroundColor }
				>
					<ColorPalette
						value={ attributes.backgroundColor }
						onChange={ ( colorValue ) => setAttributes( { backgroundColor: colorValue } ) }
					/>
				</PanelColor>
				<PanelBody initialOpen={ true } title={ __( 'Padding' ) }>
					<RangeControl
						value={ attributes.paddingTop }
						label={ __( 'Padding Top' ) }
						onChange={ ( paddingTop ) => setAttributes( { paddingTop } ) }
						min={ 0 }
						max={ 250 }
					/>
					<RangeControl
						value={ attributes.paddingRight }
						label={ __( 'Padding Right' ) }
						onChange={ ( paddingRight ) => setAttributes( { paddingRight } ) }
						min={ 0 }
						max={ 250 }
					/>
					<RangeControl
						value={ attributes.paddingBottom }
						label={ __( 'Padding Bottom' ) }
						onChange={ ( paddingBottom ) => setAttributes( { paddingBottom } ) }
						min={ 0 }
						max={ 250 }
					/>
					<RangeControl
						value={ attributes.paddingLeft }
						label={ __( 'Padding Left' ) }
						onChange={ ( paddingLeft ) => setAttributes( { paddingLeft } ) }
						min={ 0 }
						max={ 250 }
					/>
				</PanelBody>
				<PanelBody initialOpen={ true } title={ __( 'Margin' ) }>
					<RangeControl
						value={ attributes.marginTop }
						label={ __( 'Margin Top' ) }
						onChange={ ( marginTop ) => setAttributes( { marginTop } ) }
						min={ 0 }
						max={ 250 }
					/>
					<RangeControl
						value={ attributes.marginBottom }
						label={ __( 'Margin Bottom' ) }
						onChange={ ( marginBottom ) => setAttributes( { marginBottom } ) }
						min={ 0 }
						max={ 250 }
					/>
				</PanelBody>
			</InspectorControls>
		);

	}

}
