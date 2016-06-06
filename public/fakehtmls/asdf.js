var texthtml = ``+`<div class="card small card-custom" style="position: relative;">
    <div class="badge-container">
        `+true?`<div class="badge-custom badge-orange">투표</div>`:``
        +true?`<div class="badge-custom badge-blue">작성</div>`:``
        +true?`<div class="badge-custom badge-teal">갱신</div>`:``+`
    </div>
    <div class="card-image waves-effect waves-block waves-light">
        <a href="group?groupname=--+ group.Groupname +--">
            <img src="--+ group.GroupImageURL +--" onerror="this.src='/image_404.png'" style="width: 200px; height:200px;"/>
        </a>
    </div>
    <div class="card-content">
        <span class="card-title activator black-text strong">
            --+ group.Groupname +--
            <i class="material-icons right">more_vert</i>
        </span>
    </div>
    <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">
            --+ group.Groupname +--
            <i class="material-icons right">close</i>
        </span>
        <br>
        만든이 : --+ group.creator +--<br>
        독자 수 : --+ group.readers +--<br>
        작가 수 : --+ group.writers +--<br>
        장르 : --+ group.Genre +-- <br>
        길이 :  0 <br>
        <span style="text-align: right;">
            <a href="group?groupname=--+ group.Groupname +--" style="color:light-blue;">
                <i class="material-icons right">input</i>
            </a>
        </span>
    </div>
</div>