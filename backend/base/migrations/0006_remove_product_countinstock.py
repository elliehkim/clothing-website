# Generated by Django 4.2.1 on 2023-06-27 07:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_product_gender_alter_product_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='countInStock',
        ),
    ]