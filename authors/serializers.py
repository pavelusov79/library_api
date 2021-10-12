from rest_framework import serializers

from .models import Author, Biography, Book, Article


class AuthorModelSerializer(serializers.HyperlinkedModelSerializer):
    article = serializers.HyperlinkedIdentityField(many=True, read_only=True, view_name='article-detail')
    book_set = serializers.StringRelatedField(many=True)
    biography = serializers.StringRelatedField()

    class Meta:
        model = Author
        fields = ['url', 'id', 'last_name', 'first_name', 'birthday', 'biography', 'article', 'book_set']


class BiographySerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()

    class Meta:
        model = Biography
        fields = ['id', 'text', 'author']


class BookSerializer(serializers.ModelSerializer):
    authors = serializers.SlugRelatedField(many=True, 
                                           slug_field='first_name', 
                                           queryset=Author.objects.all()
    )

    class Meta:
        model = Book
        fields = ['id', 'title', 'authors']


class ArticleSerializer(serializers.ModelSerializer):
    author = serializers.SlugRelatedField( slug_field='first_name', 
                                           queryset=Author.objects.all()
    )
    class Meta:
        model = Article
        fields = '__all__'




